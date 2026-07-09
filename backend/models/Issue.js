const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    caseId: String,
    clientName: String,
    lawyerName: String,
    lawyerEmail: String,
clientEmail: String,
    message: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);