const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getRecentCases,
  getUpcomingHearings,
} = require("../controllers/dashboardController");

router.get("/", auth, getDashboardStats);
router.get("/recent", auth, getRecentCases);
router.get("/hearings", auth, getUpcomingHearings);
module.exports = router;