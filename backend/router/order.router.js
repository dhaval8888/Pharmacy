import express from "express"
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controller/order.conroller.js";
import {authanticate} from './../middleware/authorize.js'
const router=express.Router();


router.post("/create",authanticate, createOrder);
router.get("/fetch",authanticate,getAllOrders)
router.get("/fetch/:id",authanticate,getOrderById)
router.put("/update/:id",authanticate, updateOrder)
router.delete("/delete/:id",authanticate, deleteOrder)

export default router;