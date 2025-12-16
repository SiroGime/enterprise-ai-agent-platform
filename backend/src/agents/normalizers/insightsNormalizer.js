module.exports = function normalizeInsights(data = {}) {
  return {
    answer: data.answer || "",
    conclusions: Array.isArray(data.conclusions) ? data.conclusions : [],
    recommendations: Array.isArray(data.recommendations)
      ? data.recommendations
      : []
  };
};
