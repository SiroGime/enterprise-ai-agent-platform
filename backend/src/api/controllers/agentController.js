exports.testAgent = (req, res) => {
  res.json({
    message: "Agent API working",
    agent: "base-agent",
    status: "ready"
  });
};
