const DocumentIngestor = require("../../core/ingestion/DocumentIngestor");

exports.ingestDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const result = await DocumentIngestor.ingest(file);

    res.json({
      message: "Document processed successfully",
      chunks: result.chunks.length,
      cleanedLength: result.cleaned.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};