const express = require("express");
const router = express.Router();
const multer = require("multer");

const { BlobServiceClient } = require("@azure/storage-blob");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER
);

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const blobName = `${Date.now()}-${req.file.originalname}`;

    const blockBlobClient =
      containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(req.file.buffer);

    res.json({
      message: "File Uploaded Successfully",
      fileName: blobName,
      fileUrl: blockBlobClient.url,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Upload Failed",
      error: err.message,
    });
  }
});

module.exports = router;