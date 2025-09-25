import mongoose from "mongoose";
const internshipApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    linkedIn: { type: String },
    residency: { type: String, required: true },
    university: { type: String },
    major: { type: String },
    minor: { type: String },
    graduationDate: { type: String },

    // ✅ Store Cloudinary URLs
    resume: { type: String, default: null },
    transcript: { type: String, default: null },

    source: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    whyIntern: { type: String },
    coreService: { type: String },
    longTermGoal: { type: String },
    values: { type: String },

    certificationConfirmed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const InternshipApplication = mongoose.model(
  "InternshipApplication",
  internshipApplicationSchema
);

export default InternshipApplication;
// export default mongoose.model("InternshipApplication", internshipApplicationSchema); // Use this if you prefer ES6 modules
