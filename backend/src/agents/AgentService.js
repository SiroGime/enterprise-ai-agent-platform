const llm = require("./ollamaClient");

// Recorta contexto a X caracteres para no romper el modelo
function buildContext(contextResult, maxChars = 1200) {
  if (!contextResult?.contextText) return "";
  return contextResult.contextText.slice(0, maxChars);
}

class AgentService {

  async analyzeDocument(question, contextResult) {
    const context = buildContext(contextResult);

    const prompt = `
      Devuelve SOLO JSON válido.
      Analiza el contenido y responde con resumen, puntos clave, riesgos, oportunidades y métricas.

      Contexto:
      ${context}

      Pregunta:
      ${question}

      Formato estrictamente JSON:
      {
        "summary": "",
        "key_points": [],
        "risks": [],
        "opportunities": [],
        "metrics": []
      }
    `
    ;

    return await llm.generate(prompt);
  }

  async classifyDocument(question, contextResult) {
    const context = buildContext(contextResult);

    const prompt = `
      Devuelve SOLO JSON válido. Clasifica el documento.

      Tipos: factura, contrato, informe, analisis, otro.

      Contexto:
      ${context}

      Pregunta:
      ${question}

      Formato JSON:
      {
        "type": "",
        "fields": {}
      }
    `
    ;

    return await llm.generate(prompt);
  }

  async generateInsights(question, contextResult) {
    const context = buildContext(contextResult);

    const prompt = `
      Devuelve SOLO JSON válido. Genera respuesta, conclusiones y recomendaciones.

      Contexto:
      ${context}

      Pregunta:
      ${question}

      Formato JSON:
      {
        "answer": "",
        "conclusions": [],
        "recommendations": []
      }
    `
    ;

    return await llm.generate(prompt);
  }
}

module.exports = new AgentService();
