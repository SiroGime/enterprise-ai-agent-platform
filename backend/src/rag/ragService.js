const embedder = require("./embeddings/localEmbedder");
const vectorStore = require("./vectorstore/chromaStore");

class RAGService {
  async indexDocument(cleanedChunks) {
    const embeddings = await embedder.embed(cleanedChunks);
    const added = await vectorStore.addDocuments(cleanedChunks, embeddings);
    return added;
  }

  async query(text, topK = 5) {
    const [embedding] = await embedder.embed([text]);
    return await vectorStore.query(embedding, topK);
  }
}

module.exports = new RAGService();
