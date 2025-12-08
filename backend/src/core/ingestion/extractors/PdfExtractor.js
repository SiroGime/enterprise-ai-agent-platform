const fs = require("fs");
const pdf = require("pdf-parse");

class PdfExtractor {
  static async extract(file) {
    const filePath = file.path;

    // Leemos el PDF como buffer
    const buffer = fs.readFileSync(filePath);

    // Usamos pdf-parse directamente
    const data = await pdf(buffer);

    return data.text;
  }
}

module.exports = PdfExtractor;
