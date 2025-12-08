const fs = require("fs");
const mammoth = require("mammoth");

class DocxExtractor {
  static async extract(file) {
    const buffer = fs.readFileSync(file.path);

    const result = await mammoth.extractRawText({ buffer });

    return result.value; // El texto plano extraído
  }
}

module.exports = DocxExtractor;
