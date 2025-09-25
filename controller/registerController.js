import InternshipApplication from "../model/model.js";

// @desc Submit new internship application
// @route POST /api/applications

// controllers/registerController.js

export const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      linkedIn,
      residency,
      university,
      major,
      minor,
      graduationDate,
      source,
      startDate,
      endDate,
      whyIntern,
      coreService,
      longTermGoal,
      values,
      certificationConfirmed,
    } = req.body;

    // ✅ Cloudinary uploads give you `req.files[field][0].path` as URL
    const resume = req.files?.resume?.[0]?.path || null;
    const transcript = req.files?.transcript?.[0]?.path || null;

    const application = new InternshipApplication({
      fullName,
      email,
      phone,
      linkedIn,
      residency,
      university,
      major,
      minor,
      graduationDate,
      resume, // <-- Cloudinary URL stored
      transcript, // <-- Cloudinary URL stored
      source,
      startDate,
      endDate,
      whyIntern,
      coreService,
      longTermGoal,
      values,
      certificationConfirmed,
    });

    await application.save();

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: application,
    });
  } catch (err) {
    console.error("❌ Error creating application:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: err.message,
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry",
        error: err.keyValue,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating application",
      error: err.message,
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
