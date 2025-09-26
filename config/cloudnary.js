// config/cloudinary.js
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary with credentials from .env
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadResume = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "resumes",
      resource_type: "auto",
      upload_preset: "resume_upload", // 🔑 use your preset here
    });
    return result.secure_url; // ✅ public link to store in DB
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
export default cloudinary;
