import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
} from "../controller/registerController.js";

const router = express.Router();

router.post("/signup", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);

export default router;
