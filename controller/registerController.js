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
      resume,
      transcript,
      source,
      startDate,
      endDate,
      whyIntern,
      coreService,
      longTermGoal,
      values,
      certificationConfirmed,
    } = req.body;

    // 1. Basic validation (backend side)
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
        requiredFields: [
          "fullName",
          "email",
          "phone",
          "residency",
          "certificationConfirmed",
        ],
      });
    }

    // 2. Check if applicant already applied with the same email
    const existing = await InternshipApplication.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An application with this email already exists.",
      });
    }

    // 3. Create and save new application
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
      resume,
      transcript,
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

    // 4. Return success response
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      data: {
        id: newApplication._id,
        fullName: newApplication.fullName,
        email: newApplication.email,
        phone: newApplication.phone,
        residency: newApplication.residency,
        university: newApplication.university,
        createdAt: newApplication.createdAt,
      },
    });
  } catch (err) {
    console.error("Error creating application:", err);

    // 🔹 Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors,
      });
    }

    // 🔹 Handle duplicate key errors (unique fields like email)
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `Duplicate entry for ${duplicateField}: ${err.keyValue[duplicateField]}`,
      });
    }

    // 🔹 Handle cast errors (e.g., invalid ObjectId)
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${err.path}: ${err.value}`,
      });
    }

    // 🔹 Default: Internal Server Error
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
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
