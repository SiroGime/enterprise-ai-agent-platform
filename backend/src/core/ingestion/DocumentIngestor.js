const PdfExtractor = require("./extractors/PdfExtractor.js");
const TxtExtractor = require("./extractors/TxtExtractor.js");
const DocxExtractor = require("./extractors/DocxExtractor.js");

const cleanText = require("../../utils/cleanText.js");
const chunkText = require("../../utils/chunkText.js");

class DocumentIngestor {
  static async ingest(file) {
    let rawText = "";

    // Detect file type
    if (file.mimetype === "application/pdf") {
      rawText = await PdfExtractor.extract(file);
    } 
    else if (file.mimetype === "text/plain") {
      rawText = await TxtExtractor.extract(file);
    } 
    else if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      rawText = await DocxExtractor.extract(file);
    } 
    else {
      throw new Error("Unsupported file type");
    }

    const cleaned = cleanText(rawText);
    const chunks = chunkText(cleaned);

    return {
      rawText,
      cleaned,
      chunks
    };
  }
}

module.exports = DocumentIngestor;
