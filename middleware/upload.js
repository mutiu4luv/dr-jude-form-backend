import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudnary.js";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "internship_uploads", // all files go into this folder in Cloudinary
    allowed_formats: ["pdf", "doc", "docx", "jpg", "png"],
    resource_type: "auto", // auto-detect file type
  },
});

const upload = multer({ storage });

export default upload;
