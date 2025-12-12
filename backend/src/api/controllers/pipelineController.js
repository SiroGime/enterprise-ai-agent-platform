const DocumentIngestor = require("../../core/ingestion/DocumentIngestor");
const RAGService = require("../../rag/ragService");
const AgentService = require("../../agents/AgentService");

exports.fullPipeline = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1) Ingesta del archivo
    const { rawText, cleaned, chunks } = await DocumentIngestor.ingest(file);

    // 2) Indexación en Chroma
    const total = await RAGService.indexDocument(chunks);

    // 3) Consulta RAG usando los primeros 800 chars reales del documento
    const queryText = cleaned.slice(0, 800);
    const ragContext = await RAGService.query(queryText);

    // 4) Ejecutar agentes EN PARALELO con manejo individual de errores
    const safe = async (fn) => {
      try {
        return await fn();
      } catch (err) {
        return { error: err.message };
      }
    };

    const [analyst, classifier, insights] = await Promise.all([
      safe(() => AgentService.analyzeDocument(queryText, ragContext)),
      safe(() => AgentService.classifyDocument(queryText, ragContext)),
      safe(() => AgentService.generateInsights(queryText, ragContext)),
    ]);

    // 5) Respuesta final
    res.json({
      file: file.originalname,
      chunks: chunks.length,
      chunksIndexed: total,
      ragContext: ragContext.contextText, // útil para debug
      agents: {
        analyst,
        classifier,
        insights,
      },
    });

  } catch (error) {
    console.error("Pipeline error:", error);
    res.status(500).json({ error: error.message });
  }
};
