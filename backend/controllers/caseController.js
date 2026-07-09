const Case = require("../models/Case");

// Add Case
exports.addCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body);
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Cases
exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Case
exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Case
exports.deleteCase = async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.json({ message: "Case Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.searchCases = async (req, res) => {
    try {
      const { keyword } = req.query;
  
      const cases = await Case.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { clientName: { $regex: keyword, $options: "i" } },
          { lawyerName: { $regex: keyword, $options: "i" } }
        ]
      });
  
      res.json(cases);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.filterCases = async (req, res) => {
    try {
      const cases = await Case.find({
        status: req.params.status,
      });
  
      res.json(cases);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.getCaseById = async (req, res) => {
    try {
      const caseData = await Case.findById(req.params.id);
  
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
  exports.uploadDocument = async (req, res) => {
    try {
      const updatedCase = await Case.findByIdAndUpdate(
        req.params.id,
        {
          document: req.file.filename,
        },
        { new: true }
      );
  
      res.json(updatedCase);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };