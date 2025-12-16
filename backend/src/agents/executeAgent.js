const {
  createSuccessAgentResult,
  createFailedAgentResult
} = require("./agentResultFactory");

async function executeAgent(agentFn, ...args) {
  const start = Date.now();

  try {
    const data = await agentFn(...args);
    const duration = Date.now() - start;

    return createSuccessAgentResult(data, duration);
  } catch (error) {
    return createFailedAgentResult(error.message || "Agent execution failed");
  }
}

module.exports = executeAgent;
