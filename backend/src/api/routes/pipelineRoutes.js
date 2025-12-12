const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const pipelineController = require("../controllers/pipelineController");

router.post("/full", upload.single("file"), pipelineController.fullPipeline);

module.exports = router;
