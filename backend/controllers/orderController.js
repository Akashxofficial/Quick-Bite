import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Config
const currency = "inr";
const deliveryCharge = 50;
const frontend_URL = "http://localhost:5173";

// Place Order with Stripe
const placeOrder = async (req, res) => {
    try {
        const {
            userId,
            items,
            amount,
            address,
            userLocation,
            restaurantLocation
        } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            userLocation,
            restaurantLocation
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map(item => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency,
                product_data: { name: "Delivery Charge" },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while placing order." });
    }
};

// COD order
const placeOrderCod = async (req, res) => {
    try {
        const {
            userId,
            items,
            amount,
            address,
            userLocation,
            restaurantLocation
        } = req.body;

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            userLocation,
            restaurantLocation,
            payment: true
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully (COD)" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while placing COD order." });
    }
};

// List all orders
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders." });
    }
};

// User's orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user orders." });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status." });
    }
};

// Verify Stripe payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Verified" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed, Order Deleted" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying payment." });
    }
};

// Track order
const trackOrder = async (req, res) => {
    const { userId } = req.params;
    try {
        const latestOrder = await orderModel.findOne({ userId }).sort({ date: -1 });

        if (!latestOrder) {
            return res.status(404).json({ success: false, message: "No Order Found" });
        }

        res.json({
            success: true,
            data: {
                items: latestOrder.items.map(item => item.name),
                status: latestOrder.status,
                date: latestOrder.date,
                userLocation: latestOrder.userLocation,
                restaurantLocation: latestOrder.restaurantLocation
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error tracking order." });
    }
};
const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "your_user_id", // Replace with actual user ID
        items: cartItems,        // Replace with your cart state
        amount: totalAmount,     // Replace with your total amount
        address: userAddress,    // Replace with actual address
        userLocation: userLocation,         // Replace with actual coordinates
        restaurantLocation: restaurantLocation // Replace with restaurant coordinates
      })
    });

    const data = await response.json();
    console.log("Stripe Response:", data); // ✅ Good for debugging

    if (data.success && data.session_url) {
      window.location.href = data.session_url; // ✅ Redirect to Stripe
    } else {
      alert("Payment session failed to create.");
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    alert("Something went wrong. Please try again.");
  }
};

export {
    placeOrder,
    placeOrderCod,
    listOrders,
    userOrders,
    updateStatus,
    verifyOrder,
    trackOrder
};
