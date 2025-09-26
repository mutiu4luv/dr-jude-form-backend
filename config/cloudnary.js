// controllers/internshipController.js
import cloudinary from "cloudinary";
import InternshipApplication from "../models/internshipModel.js";

// ✅ configure cloudinary once
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createApplication = async (req, res) => {
  try {
    let resumeUrl = null;
    let transcriptUrl = null;

    console.log("📂 Uploaded files:", req.files);

    // ✅ upload resume if present
    if (req.files?.resume) {
      const resumeUpload = await cloudinary.v2.uploader.upload(
        req.files.resume[0].path,
        { resource_type: "auto" }
      );
      resumeUrl = resumeUpload.secure_url;
    }

    // ✅ upload transcript if present
    if (req.files?.transcript) {
      const transcriptUpload = await cloudinary.v2.uploader.upload(
        req.files.transcript[0].path,
        { resource_type: "auto" }
      );
      transcriptUrl = transcriptUpload.secure_url;
    }

    const application = new InternshipApplication({
      ...req.body,
      resume: resumeUrl,
      transcript: transcriptUrl,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  } catch (err) {
    console.error("❌ Error creating application:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating application",
      error: err.message,
    });
  }
};
