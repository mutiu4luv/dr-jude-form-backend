import InternshipApplication from "../model/model.js";

// @desc Submit new internship application
// @route POST /api/applications

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

    // ✅ Uploaded files from Cloudinary
    const resume = req.files?.resume?.[0]?.path || null;
    const transcript = req.files?.transcript?.[0]?.path || null;

    if (
      !fullName ||
      !email ||
      !phone ||
      !residency ||
      certificationConfirmed === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const existing = await InternshipApplication.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An application with this email already exists.",
      });
    }

    const newApplication = new InternshipApplication({
      fullName,
      email,
      phone,
      linkedIn,
      residency,
      university,
      major,
      minor,
      graduationDate,
      resume, // ✅ Cloudinary URL saved
      transcript, // ✅ Cloudinary URL saved
      source,
      startDate,
      endDate,
      whyIntern,
      coreService,
      longTermGoal,
      values,
      certificationConfirmed,
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: newApplication,
    });
  } catch (err) {
    console.error("Error creating application:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
