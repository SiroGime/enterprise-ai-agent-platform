module.exports = function normalizeAnalyst(data = {}) {
  return {
    summary: data.summary || "",
    key_points: Array.isArray(data.key_points) ? data.key_points : [],
    risks: Array.isArray(data.risks) ? data.risks : [],
    opportunities: Array.isArray(data.opportunities) ? data.opportunities : [],
    metrics: Array.isArray(data.metrics) ? data.metrics : []
  };
};
