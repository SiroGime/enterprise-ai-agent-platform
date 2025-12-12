const embedder = require("./embeddings/localEmbedder");
const vectorStore = require("./vectorstore/chromaStore");

class RAGService {
  async indexDocument(cleanedChunks) {
    const embeddings = await embedder.embed(cleanedChunks);
    const added = await vectorStore.addDocuments(cleanedChunks, embeddings);
    return added;
  }

  async query(text, topK = 3) {
    const [embedding] = await embedder.embed([text]);
    const result = await vectorStore.query(embedding, topK);

    // Normaliza salida
    const docs = result.documents?.flat() ?? [];
    const contextText = docs.join("\n\n");

    return {
      contextText,
      documents: docs
    };
  }
}

module.exports = new RAGService();
