import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
} from "../controller/registerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// 🔹 Create new application (with file uploads: resume + transcript)
router.post(
  "/signup",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "transcript", maxCount: 1 },
  ]),
  createApplication
);

// 🔹 Get all applications
router.get("/", getApplications);

// 🔹 Get single application by ID
router.get("/:id", getApplicationById);

// 🔹 Delete application by ID
router.delete("/:id", deleteApplication);

export default router;
