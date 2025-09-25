import InternshipApplication from "../model/model.js";

// @desc Submit new internship application
// @route POST /api/applications

// controllers/registerController.js

export const createApplication = async (req, res) => {
  try {
    const application = new InternshipApplication({ ...req.body });
    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: application,
    });
  } catch (err) {
    // ✅ Log full error details for debugging
    console.error("❌ Error creating application:", {
      message: err.message,
      name: err.name,
      code: err.code,
      errors: err.errors,
      stack: err.stack,
    });

    res.status(500).json({
      success: false,
      message: "Server error while creating application",
      error: err.message,
      details: err.errors || null, // return field-specific validation errors if available
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
