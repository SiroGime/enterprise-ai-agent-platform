const { ChromaClient } = require("chromadb");

class ChromaStore {
  constructor() {
    this.client = new ChromaClient({
      host: "localhost",
      port: 8000,
      ssl: false
    });
    this.collection = null;
  }

  async init() {
    if (!this.collection) {
      this.collection = await this.client.getOrCreateCollection({
        name: "documents",
        embeddingFunction: null
      });
    }
  }

  async addDocuments(chunks, embeddings) {
    await this.init();

    const ids = chunks.map((_, i) => `chunk_${Date.now()}_${i}`);

    await this.collection.add({
      ids,
      embeddings,
      documents: chunks,
      metadatas: chunks.map(c => ({ length: c.length }))
    });

    return ids.length;
  }

  async query(queryEmbedding, topK = 5) {
    await this.init();

    return await this.collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK
    });
  }
}

module.exports = new ChromaStore();
