import express from "express"
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controller/order.conroller.js";

const router=express.Router();


router.post("/create",createOrder);
router.get("/fetch",getAllOrders)
router.get("/fetch/:id",getOrderById)
router.put("/update/:id", updateOrder)
router.delete("/delete/:id", deleteOrder)

export default router;