const axios = require("axios");

class OllamaClient {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:11434",
      timeout: 300000 // 300 segundos de timeout REAL
    });
  }

  async generate(prompt) {
    try {
      const response = await this.api.post("/api/generate", {
        model: "qwen2.5:1.5b-instruct",
        prompt,
        stream: false
      });

      const result = response.data?.response;

      // Si Ollama devolvió vacío → evitamos romper el pipeline
      if (!result || typeof result !== "string") {
        return `{"error": "Modelo no devolvió respuesta"}`;
      }

      // Intentamos retornar JSON válido
      const jsonStart = result.indexOf("{");
      const jsonEnd = result.lastIndexOf("}");

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonText = result.substring(jsonStart, jsonEnd + 1);
        try {
          return JSON.parse(jsonText);
        } catch (e) {
          // Si no es JSON válido lo devolvemos como texto
          return { raw: result };
        }
      }

      return { raw: result };

    } catch (error) {
      console.error("Error llamando a Ollama:", error.message);

      return {
        error: "Ollama no respondió a tiempo",
        details: error.message
      };
    }
  }
}

module.exports = new OllamaClient();
