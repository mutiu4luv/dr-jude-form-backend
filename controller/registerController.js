import InternshipApplication from "../model/model.js";
import cloudinary from "../config/cloudnary.js"; // ✅ use centralized config

// @desc Submit new internship application
// @route POST /api/applications

// controllers/registerController.js

export const createApplication = async (req, res) => {
  try {
    let resumeUrl = null;
    let transcriptUrl = null;

    console.log("📂 Uploaded files:", req.files);

    if (req.files?.resume) {
      const resumeUpload = await cloudinary.v2.uploader.upload(
        req.files.resume[0].path,
        { resource_type: "auto" }
      );
      resumeUrl = resumeUpload.secure_url;
    }

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
      stack: process.env.NODE_ENV !== "production" ? err.stack : undefined, // Optional: include stack trace
    });
  }
};

// @desc Get all internship applications
// @route GET /api/applications
export const getApplications = async (req, res) => {
  try {
    const applications = await InternshipApplication.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      hasError: false,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      hasError: true,
      message: err.message,
    });
  }
};

// @desc Get one application by ID
// @route GET /api/applications/:id
export const getApplicationById = async (req, res) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        hasError: true,
        message: "Application not found",
      });
    }

    res.status(200).json({
      hasError: false,
      data: application,
    });
  } catch (err) {
    res.status(500).json({
      hasError: true,
      message: err.message,
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const deleted = await InternshipApplication.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        hasError: true,
        message: "Application not found",
      });
    }

    res.status(200).json({
      hasError: false,
      message: "Application deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({
      hasError: true,
      message: err.message,
    });
  }
};
