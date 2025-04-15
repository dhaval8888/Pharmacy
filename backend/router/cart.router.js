import express from "express"
import { addToCart, clearUserCart, getUserCart, removeFromCart, updateCartItem } from "../controller/cart.controller.js";

const router = express.Router();
router.post("/add", addToCart);
router.get("/fetch/:user_id", getUserCart);
router.put("/update/:cart_id", updateCartItem);
router.delete("/remove/:cart_id", removeFromCart);
router.delete("/clear/:user_id", clearUserCart);

export default router;