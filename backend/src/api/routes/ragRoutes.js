const express = require("express");
const router = express.Router();
const ragController = require("../controllers/ragController");

router.post("/index", ragController.indexDocument);
router.post("/query", ragController.query);

module.exports = router;
