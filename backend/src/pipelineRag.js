const path = require("path");
require("dotenv").config();

// Ingestores
const DocumentIngestor = require("./core/ingestion/DocumentIngestor");

// Utils
const cleanText = require("./utils/cleanText");
const chunkText = require("./utils/chunkText");

// RAG Service
const ragService = require("./rag/ragService");

async function pipelineRag() {
  try {
    console.log("\n=== Día 4: Pipeline RAG Completo ===\n");

    // Archivo a procesar
    const filePath = path.join(__dirname, "./documents/Dia4.docx");

    // 1. EXTRAER TEXTO, LIMPIAR TEXTO Y GENERAR CHUNKS
    console.log("🟦 Extrayendo texto... Limpiando texto... Generando chunks...");
    const { rawText, cleaned, chunks } = await DocumentIngestor.ingest({
      mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      path: filePath
    });

    // 4. INDEXAR EN VECTOR STORE (embeddings + chromaStore)
    console.log("🟪 Indexando documento en Chroma...");
    const added = await ragService.indexDocument(chunks);

    console.log(`\n🔥 Ingesta finalizada: ${added} chunks indexados`);

    // 5. PROBAR CONSULTA
    console.log("\n🔍 Probando pregunta RAG...\n");

    const pregunta = "¿De qué trata este documento?";
    const results = await ragService.query(pregunta, 5);

    console.log("=== RESULTADOS RAG ===");
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error("❌ Error en el pipeline Día 4:", err);
  }
}

pipelineRag();
