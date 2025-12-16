const DocumentIngestor = require("../../core/ingestion/DocumentIngestor");
const RAGService = require("../../rag/ragService");
const AgentService = require("../../agents/AgentService");

const executeAgent = require("../../agents/executeAgent");
const { createPendingAgentResult } = require("../../agents/agentResultFactory");

exports.fullPipeline = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1) Ingesta
    const { cleaned, chunks } = await DocumentIngestor.ingest(file);

    // 2) Indexación RAG
    const chunksIndexed = await RAGService.indexDocument(chunks);

    // 3) Query RAG
    const queryText = cleaned.slice(0, 800);
    const ragContext = await RAGService.query(queryText);

    // 4) Inicializar estados de agentes
    const agents = {
      analyst: createPendingAgentResult(),
      classifier: createPendingAgentResult(),
      insights: createPendingAgentResult()
    };

    // 5) Ejecutar agentes (aislados, seguros)
    agents.analyst = await executeAgent(
      AgentService.analyzeDocument.bind(AgentService),
      queryText,
      ragContext
    );

    agents.classifier = await executeAgent(
      AgentService.classifyDocument.bind(AgentService),
      queryText,
      ragContext
    );

    agents.insights = await executeAgent(
      AgentService.generateInsights.bind(AgentService),
      queryText,
      ragContext
    );

    // 6) Respuesta final profesional
    res.json({
      status: "success",
      meta: {
        file: file.originalname,
        chunks: chunks.length,
        chunksIndexed
      },
      agents
    });

  } catch (error) {
    console.error("Pipeline error:", error);
    res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
};
