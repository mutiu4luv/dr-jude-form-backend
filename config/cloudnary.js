// controllers/internshipController.js
import cloudinary from "cloudinary";
// import InternshipApplication from "../models/internshipModel.js";

// configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export const createApplication = async (req, res) => {
//   try {
//     // ✅ upload resume to cloudinary
//     const resumeUpload = await cloudinary.v2.uploader.upload(
//       req.files.resume[0].path,
//       { resource_type: "auto" }
//     );

//     const transcriptUpload = await cloudinary.v2.uploader.upload(
//       req.files.transcript[0].path,
//       { resource_type: "auto" }
//     );

//     const application = new InternshipApplication({
//       ...req.body,
//       resume: resumeUpload.secure_url,
//       transcript: transcriptUpload.secure_url,
//     });

//     await application.save();

//     res.status(201).json({
//       success: true,
//       message: "Application created successfully",
//       data: application,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating application",
//       error: err.message,
//     });
//   }
// };
