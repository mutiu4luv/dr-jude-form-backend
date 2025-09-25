import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import internshipRoutes from "./routes/intenshipRoutes.js";
import complaintRoutes from "./routes/complain.js";
// import corsMiddleware from "./config/cors.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 7000;
const app = express();

// app.use(corsMiddleware);
// const allowedOrigins = [
//   process.env.FRONTEND_URL_MAIN,
//   process.env.MAIN_APP_URL,
//   process.env.FRONTEND_URL,
//   "http://localhost:5173",
// ].filter(Boolean);

// console.log(allowedOrigins);
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Routes
app.use("/api/user/", internshipRoutes);
app.use("/api/complaints", complaintRoutes);

// Connect MongoDB
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in your .env file now");
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
    console.error("❌ MongoDatBase connection error:", err.message);
    process.exit(1); // stop server if DB fails
  });
