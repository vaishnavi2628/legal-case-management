const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addCase,
  getCases,
  updateCase,
  deleteCase,
  searchCases,
  filterCases,
  getCaseById,
  uploadDocument,
  
} = require("../controllers/caseController");
const upload = require("../middleware/upload");
// Protected Routes
router.post("/", auth, addCase);

router.get("/", auth, getCases);

router.get("/search", auth, searchCases);

router.get("/status/:status", auth, filterCases);


router.get("/:id", auth, getCaseById);
router.post(
    "/upload/:id",
    auth,
    upload.single("document"),
    uploadDocument
  );

router.put("/:id", auth, updateCase);

router.delete("/:id", auth, deleteCase);

module.exports = router;