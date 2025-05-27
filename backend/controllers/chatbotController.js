export const handleChatbotMessage = async (req, res) => {
  const { message, userId } = req.body;

  try {
    // Basic validation for message
    if (!message) {
      return res.status(400).json({ reply: "⚠️ Please send a message." });
    }

    // Simulate processing the message and generating a response
    let response = "";

    // Example responses based on message content
    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
      response = `👋 Hi there, ${userId}! How can I help you today?`;
    } else if (message.toLowerCase().includes("track")) {
      // Track order logic or example response
      response = "🛎️ Tracking your order. Please wait...";
    } else if (message.toLowerCase().includes("menu")) {
      // Example response with menu info (you can fetch real menu items from the DB)
      response = "🍽️ Here's our menu: \n1. Pizza - ₹200 \n2. Burger - ₹120 \n3. Pasta - ₹180";
    } else {
      // Default response for unrecognized messages
      response = `🤖 Sorry, I couldn't understand that. Please try again.`;
    }

    // Return the response as JSON
    res.json({ reply: response });
  } catch (error) {
    console.error("Error handling chatbot message:", error);
    res.status(500).json({ reply: "⚠️ Something went wrong. Please try again later." });
  }
};
