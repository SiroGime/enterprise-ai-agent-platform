const safeJSONParse = require("../utils/jsonParser");

async function runAgent(llm, prompt, retryPrompt = null) {
  const first = await llm.generate(prompt);
  const parsed = safeJSONParse(first);

  if (parsed) return parsed;

  if (retryPrompt) {
    const retry = await llm.generate(retryPrompt);
    return safeJSONParse(retry);
  }

  return null;
}

module.exports = runAgent;
