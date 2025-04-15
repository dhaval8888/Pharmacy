import express from "express";
import { createDoctor, deletedoctor, getAllDoctor, getDoctor, updateDoctor } from "../controller/doctor.controller.js";

const router = express.Router();

router.post("/create", createDoctor);
router.get("/fetch",getAllDoctor)
router.get("/fetch/:id",getDoctor)
router.put("/update/:id", updateDoctor)
router.delete("/delete/:id", deletedoctor)

export default router;