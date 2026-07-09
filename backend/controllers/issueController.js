const Issue = require("../models/Issue");

exports.raiseIssue = async (req, res) => {
  try {
    const issue = await Issue.create(req.body);

    res.status(201).json({
      message: "Issue Raised Successfully",
      issue,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getIssues = async (req, res) => {
    try {
        const issues = await Issue.find({
            lawyerEmail: req.user.email,
          }).sort({ createdAt: -1 });
  
      res.json(issues);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };
  exports.resolveIssue = async (req, res) => {
    try {
      const issue = await Issue.findByIdAndUpdate(
        req.params.id,
        {
          status: "Resolved",
        },
        {
          new: true,
        }
      );
  
      res.json({
        message: "Issue Resolved",
        issue,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };

    