import express from "express"
import { createMedi, deleteMedi, getAllMedi, getMedi, setDefaultImage, updateMedi } from "../controller/medicine.controller.js";

const router = express.Router();

router.post("/create",createMedi);
router.get("/fetch",getAllMedi)
router.get("/fetchone/:id",getMedi)
router.put("/update/:id", updateMedi)
router.delete("/delete/:id", deleteMedi)
router.put("/update-all-images", setDefaultImage)


export default router;