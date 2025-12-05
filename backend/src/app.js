const express = require("express");
const cors = require("cors");

const healthRoutes = require("./api/routes/healthRoutes");
const agentRoutes = require("./api/routes/agentRoutes");
const ragRoutes = require("./api/routes/ragRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/rag", ragRoutes);

module.exports = app;
