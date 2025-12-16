const llm = require("./ollamaClient");
const runAgent = require("./runAgent");
const safeJSONParse = require("../utils/jsonParser");

const normalizeAgentOutput = require("../utils/normalizeAgentOutput");
const normalizeKeyPoints = require("../utils/normalizeKeyPoints");

const analystSchema = require("./schemas/analystSchema");

const classifierSchema = {
  type: "otro",
  fields: {}
};

const insightsSchema = {
  answer: "",
  conclusions: [],
  recommendations: []
};

function buildContext(result, maxChunks = 3) {
  if (!result) return "";

  if (typeof result === "string") return result;

  if (typeof result.ragContext === "string") {
    return result.ragContext;
  }

  if (Array.isArray(result.documents)) {
    if (Array.isArray(result.documents[0])) {
      return result.documents[0].slice(0, maxChunks).join("\n\n");
    }

    if (typeof result.documents[0] === "string") {
      return result.documents.slice(0, maxChunks).join("\n\n");
    }
  }

  return "";
}

class AgentService {

  async analyzeDocument(question, contextResult) {
    const context = buildContext(contextResult, 3);

    const prompt = `
      Eres un analista profesional de documentos.
      Devuelve SOLO JSON válido. No texto.

      {
        "summary": "",
        "key_points": [
          {
            "description": "",
            "importance_level": "Low | Medium | High",
            "example": ""
          }
        ],
        "risks": [],
        "opportunities": [],
        "metrics": []
      }

      Contexto:
      ${context}

      Pregunta:
      ${question}
      `
    ;

    const retryPrompt = `Devuelve SOLO JSON válido.`;

    const raw = await runAgent(llm, prompt, retryPrompt);
    const parsed = safeJSONParse(raw) || {};

    const normalized = normalizeAgentOutput(analystSchema, parsed);
    normalized.key_points = normalizeKeyPoints(normalized.key_points);

    return normalized;
  }

  async classifyDocument(question, contextResult) {
    const context = buildContext(contextResult, 2);

    const prompt = `
      Eres un clasificador de documentos empresariales.
      Devuelve SOLO JSON válido.

      Criterios estrictos:

      factura:
      - montos
      - precios
      - impuestos
      - datos de pago

      contrato:
      - obligaciones legales
      - cláusulas
      - partes involucradas
      - compromisos formales

      informe:
      - texto descriptivo
      - análisis contextual
      - explicación informativa
      - NO contiene obligaciones legales

      analisis:
      - evaluación técnica
      - conclusiones
      - métricas o comparaciones

      otro:
      - no encaja claramente en los anteriores

      {
        "type": "",
        "fields": {}
      }

      Contexto:
      ${context}
      `
    ;

    const retryPrompt = `Devuelve SOLO JSON válido.`;

    const raw = await runAgent(llm, prompt, retryPrompt);
    const parsed = safeJSONParse(raw) || {};

    return normalizeAgentOutput(classifierSchema, parsed);
  }

  async generateInsights(question, contextResult) {
    const context = buildContext(contextResult, 3);

    const prompt = `
      Eres un analista estratégico.
      Devuelve SOLO JSON válido.

      {
        "answer": "",
        "conclusions": [],
        "recommendations": []
      }

      Contexto:
      ${context}

      Pregunta:
      ${question}
      `
    ;

    const retryPrompt = `Devuelve SOLO JSON válido.`;

    const raw = await runAgent(llm, prompt, retryPrompt);
    const parsed = safeJSONParse(raw) || {};

    const normalized = normalizeAgentOutput(insightsSchema, parsed);

    // Fallback seguro para frontend
    if (!normalized.answer || normalized.answer.trim() === "") {
      normalized.answer =
        "No se pudo generar una respuesta concluyente con el contexto disponible.";
    }

    return normalized;
  }
}

module.exports = new AgentService();
