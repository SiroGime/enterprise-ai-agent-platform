exports.healthCheck = (req, res) => {
  res.json({
    status: "ok",
    service: "Enterprise AI Agent Platform",
    timestamp: new Date().toISOString()
  });
};
