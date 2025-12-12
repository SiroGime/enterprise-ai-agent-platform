const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

router.get("/test", agentController.testAgent);
router.post("/analyze", agentController.analyze);
router.post("/classify", agentController.classify);
router.post("/insights", agentController.insights);

module.exports = router;
