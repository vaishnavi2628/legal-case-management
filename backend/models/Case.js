const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    lawyerName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Closed"],
      default: "Pending",
    },
    document: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },
      
      caseType: {
        type: String,
        default: "",
      },
      
      priority: {
        type: String,
        default: "Medium",
      },
      clientEmail: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      default: "",
    },
    progress: {
      type: Number,
      default: 0
  },
  lawyerEmail: {
    type: String,
    required: true,
  },
    hearingDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);