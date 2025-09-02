import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
} from "../controller/registerController.js";

const router = express.Router();

router.post("/signup", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.delete("/:id", deleteApplication);

export default router;
