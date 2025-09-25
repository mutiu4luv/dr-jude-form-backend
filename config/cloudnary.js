import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dsyedgvpf",
  api_key: process.env.CLOUDINARY_API_KEY || "712824194162146",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "owrV38pavqe68ZGf1yE8gU44_ns",
});

export default cloudinary;
