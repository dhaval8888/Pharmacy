import express from "express"
import { addToCart, clearUserCart, getUserCart, removeFromCart, updateCartItem } from "../controller/cart.controller.js";
import { authanticate } from "../middleware/authorize.js";
const router = express.Router();
router.post("/add",authanticate, addToCart);
router.get("/fetch/", authanticate,getUserCart);
router.put("/update/:cart_id",authanticate, updateCartItem);
router.delete("/remove/:cart_id", authanticate,removeFromCart);
router.delete("/clear/:user_id", authanticate,clearUserCart);

export default router;