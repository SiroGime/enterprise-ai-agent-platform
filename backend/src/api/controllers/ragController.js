const RAGService = require("../../rag/ragService");

exports.indexDocument = async (req, res) => {
  try {
    const chunks = req.body.chunks;

    if (!chunks || !Array.isArray(chunks)) {
      return res.status(400).json({ error: "Chunks are required" });
    }

    const total = await RAGService.indexDocument(chunks);

    res.json({
      message: "Document indexed",
      chunksIndexed: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.query = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) return res.status(400).json({ error: "Query text required" });

    const result = await RAGService.query(query);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
