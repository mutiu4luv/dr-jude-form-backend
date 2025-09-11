import express from "express";
import { createComplaint, getComplaints } from "../controller/complain.js";

const router = express.Router();

// Public route (Contact Us form)
router.post("/", createComplaint);

// Admin routes
router.get("/", getComplaints);
// router.put("/:id", updateComplaintStatus);

export default router;
