import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import Food from '../models/foodModel.js';
import Order from '../models/orderModel.js';

dotenv.config();

const router = express.Router();

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY in environment variables");
}

// Optional Gemini setup
let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// OpenRouter (OpenAI-compatible)
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:4000", // Change this to your domain
    "X-Title": "MERN Food Bot"
  }
});

const getAIResponse = async (prompt) => {
  // Try Gemini first if set
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn("Gemini failed. Falling back to OpenRouter. Reason:", err.message);
    }
  }

  // Fallback to OpenRouter (ChatGPT/Mistral)
  try {
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // You can change to gpt-3.5-turbo or mistral
      messages: [
        { role: "system", content: "You're a friendly food ordering assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (openaiErr) {
    console.error("OpenRouter Error:", openaiErr.message);
    throw new Error("AI chatbot failed on all platforms.");
  }
};

router.post('/', async (req, res) => {
  const { message: userMessage, userId = "http://localhost:4000" } = req.body;

  try {
    const menuItems = await Food.find();
    const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });

    // Track order logic
    if (userMessage.toLowerCase().includes("track")) {
      if (!latestOrder) {
        return res.json({
          reply: "🛍️ Sure! Please check your orders and their current status in your account for the latest updates."
        });
      }

      const orderItems = latestOrder.items?.map(item =>
        `${item.name} (₹${item.price} x ${item.quantity})`).join(', ') || "No items found.";

      let orderStatusMessage = `🛎️ Your latest order is currently **${latestOrder.status}**.\n\n**Items:** ${orderItems} 🍽️`;

      switch (latestOrder.status.toLowerCase()) {
        case 'processing':
          orderStatusMessage += "\n⏳ Your order is currently being prepared. Hang tight! 🥄";
          break;
        case 'shipped':
          orderStatusMessage += "\n🚚 Your order has been shipped and is on its way!";
          break;
        case 'delivered':
          orderStatusMessage += "\n🎉 Your order has been delivered! Enjoy your meal!";
          break;
        case 'cancelled':
          orderStatusMessage += "\n❌ Your order was cancelled. Please feel free to order again.";
          break;
        default:
          orderStatusMessage += "\n📦 We are processing your order. Please check back soon.";
      }

      return res.json({ reply: orderStatusMessage });
    }

    // AI response logic
    const menuText = menuItems.map(item => `${item.name} - ₹${item.price}`).join('\n');
    const orderText = latestOrder
      ? `Items: ${latestOrder.items.map(i => i.name).join(', ')} | Status: ${latestOrder.status}`
      : "No recent orders.";

    const prompt = `
User Message: "${userMessage}"

Menu:
${menuText}

Latest Order:
${orderText}

Generate a friendly and helpful chatbot reply considering the menu and order details.
`;

    const aiReply = await getAIResponse(prompt);
    res.json({ reply: aiReply });

  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res.status(500).json({
      reply: "⚠️ Oops! Something went wrong. Please try again later."
    });
  }
});

export default router;
