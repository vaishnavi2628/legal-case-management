const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getMyCases,
  getCaseDetails,
} = require("../controllers/clientController");

router.get("/cases", auth, getMyCases);

router.get("/case/:id", auth, getCaseDetails);

module.exports = router;