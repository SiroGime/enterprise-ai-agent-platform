function normalizeAgentOutput(schema, data) {
  const output = { ...schema };

  for (const key in schema) {
    if (Array.isArray(schema[key])) {
      output[key] = Array.isArray(data?.[key]) ? data[key] : [];
    } else {
      output[key] = data?.[key] ?? schema[key];
    }
  }

  return output;
}

module.exports = normalizeAgentOutput;
