import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import internshipRoutes from "./routes/intenshipRoutes.js";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 7000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/user/", internshipRoutes);

// Connect MongoDB
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in your .env file");
  process.exit(1); // stop the server if no DB URI
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop server if DB fails
  });
