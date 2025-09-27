import cloudinary from "cloudinary";
// import dotenv from "dotenv"; // <-- DELETE THIS LINE
// dotenv.config();             // <-- DELETE THIS LINE

// Configure Cloudinary with credentials from Render/System environment
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(cloudinary.config()); // You can remove this now too
export const uploadResume = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "resumes",
      resource_type: "auto",
      upload_preset: "resume_upload",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
export default cloudinary;
