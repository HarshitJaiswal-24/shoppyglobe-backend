import express from "express";
import { authenticate } from "../Middleware/authMiddleware.js";
import { addToCart, updateCartQuantity, deleteCartItem } from "../Controller/cartController.js";

const router = express.Router();

// POST /cart
router.post("/", authenticate, addToCart);

// PUT /cart/:id
router.put("/:id", authenticate, updateCartQuantity);

// DELETE /cart/:id
router.delete("/:id", authenticate, deleteCartItem);

export default router;