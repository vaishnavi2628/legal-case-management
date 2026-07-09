const Case = require("../models/Case");

// Get all cases of logged-in client
exports.getMyCases = async (req, res) => {
  try {
    const cases = await Case.find({
      clientEmail: req.user.email,
    }).sort({ createdAt: -1 });

    res.json(cases);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Get single case details
exports.getCaseDetails = async (req, res) => {
    try {
      const caseData = await Case.findOne({
        _id: req.params.id,
        clientEmail: req.user.email,
      });
  
      if (!caseData) {
        return res.status(404).json({
          message: "Case not found",
        });
      }
  
      res.json(caseData);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };