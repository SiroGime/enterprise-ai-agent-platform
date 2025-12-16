module.exports = function normalizeClassifier(data = {}) {
  return {
    type: data.type || "otro",
    fields: typeof data.fields === "object" && data.fields !== null
      ? data.fields
      : {}
  };
};
