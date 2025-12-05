const express = require("express");
const router = express.Router();
const { testRAG } = require("../controllers/ragController");

router.get("/test", testRAG);

module.exports = router;
