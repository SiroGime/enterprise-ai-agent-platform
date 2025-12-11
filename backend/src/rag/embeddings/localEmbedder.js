const axios = require("axios");

class LocalEmbedder {
  async embed(texts) {
    const embeddings = [];

    for (const text of texts) {
      const response = await axios.post(
        "http://localhost:11434/api/embed",
        {
          model: "nomic-embed-text",
          input: text
        }
      );

      embeddings.push(response.data.embeddings[0]);
    }

    return embeddings;
  }
}

module.exports = new LocalEmbedder();
