import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
  trackOrder
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// 🛒 Place a new order (Stripe/payment flow)
orderRouter.post("/place", authMiddleware, placeOrder);

// ✅ Verify payment after checkout
orderRouter.post("/verify", verifyOrder);

// 📦 Get all orders of a user
orderRouter.post("/userorders", authMiddleware, userOrders);

// 🛠️ List all orders (Admin)
orderRouter.get("/list", listOrders);

// 🔄 Update order status (Admin)
orderRouter.post("/status", updateStatus);

// 🛰️ Real-time tracking route (New)
orderRouter.get("/track/:orderId", authMiddleware, trackOrder);
// Note: It takes `orderId` instead of userId for better tracking accuracy.

export default orderRouter;
