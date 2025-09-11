import Complaint from "../model/complain.js";

// ✅ Create new complaint (public)
export const createComplaint = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const complaint = await Complaint.create({ name, email, subject, message });

    res.status(201).json({ success: true, complaint });
  } catch (err) {
    console.error("❌ Error creating complaint:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Admin fetch all complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, complaints });
  } catch (err) {
    console.error("❌ Error fetching complaints:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Admin update complaint status
// export const updateComplaintStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const complaint = await Complaint.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!complaint) {
//       return res.status(404).json({ error: "Complaint not found" });
//     }

//     res.status(200).json({ success: true, complaint });
//   } catch (err) {
//     console.error("❌ Error updating complaint:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
