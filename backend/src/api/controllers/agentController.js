const AgentService = require("../../agents/AgentService");

exports.testAgent = (req, res) => {
  res.json({
    message: "Agent API working",
    agent: "base-agent",
    status: "ready"
  });
};

exports.analyze = async (req, res) => {
  const { question } = req.body;
  const response = await AgentService.analyzeDocument(question);
  res.json({ agent: "Document Analyst", response });
};

exports.classify = async (req, res) => {
  const { question } = req.body;
  const response = await AgentService.classifyDocument(question);
  res.json({ agent: "Operational", response });
};

exports.insights = async (req, res) => {
  const { question } = req.body;
  const response = await AgentService.generateInsights(question);
  res.json({ agent: "Insights", response });
};