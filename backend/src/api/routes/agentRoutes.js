const express = require("express");
const router = express.Router();
const { testAgent } = require("../controllers/agentController");

router.get("/test", testAgent);

module.exports = router;
