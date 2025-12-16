const AgentStatus = require("./agentStatus");

function createPendingAgentResult() {
  return {
    status: AgentStatus.PENDING,
    duration_ms: null,
    data: null,
    error: null
  };
}

function createSuccessAgentResult(data, duration) {
  return {
    status: AgentStatus.SUCCESS,
    duration_ms: duration,
    data,
    error: null
  };
}

function createFailedAgentResult(error) {
  return {
    status: AgentStatus.FAILED,
    duration_ms: null,
    data: null,
    error
  };
}

module.exports = {
  createPendingAgentResult,
  createSuccessAgentResult,
  createFailedAgentResult
};
