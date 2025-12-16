const keyPointSchema = require("../agents/schemas/keyPointSchema");

function normalizeKeyPoints(keyPoints = []) {
  return keyPoints.map(kp => ({
    description: kp.description || "",
    importance_level: kp.importance_level || "Medium",
    example: kp.example || ""
  }));
}

module.exports = normalizeKeyPoints;
