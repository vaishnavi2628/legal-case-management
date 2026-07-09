const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  raiseIssue,
  getIssues,
  resolveIssue,
} = require("../controllers/issueController");

router.post("/", auth, raiseIssue);

router.get("/", auth, getIssues);
router.put("/:id", auth, resolveIssue);

module.exports = router;