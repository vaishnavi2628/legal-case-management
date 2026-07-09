const Case = require("../models/Case");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalCases = await Case.countDocuments();

    const pendingCases = await Case.countDocuments({
      status: "Pending",
    });

    const closedCases = await Case.countDocuments({
      status: "Closed",
    });

    const inProgressCases = await Case.countDocuments({
      status: "In Progress",
    });

    res.json({
      totalCases,
      pendingCases,
      closedCases,
      inProgressCases,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.getRecentCases = async (req, res) => {
    try {
      const recentCases = await Case.find()
        .sort({ createdAt: -1 })
        .limit(5);
  
      res.json(recentCases);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };
  exports.getUpcomingHearings = async (req, res) => {
    try {
      const today = new Date();
  
      const hearings = await Case.find({
        hearingDate: { $gte: today },
      })
        .sort({ hearingDate: 1 })
        .limit(5);
  
      res.json(hearings);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };