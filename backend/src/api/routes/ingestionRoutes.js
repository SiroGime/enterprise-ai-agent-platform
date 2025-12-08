const express = require("express");
const multer = require("multer");
const { ingestDocument } = require("../controllers/ingestionController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), ingestDocument);

module.exports = router;
