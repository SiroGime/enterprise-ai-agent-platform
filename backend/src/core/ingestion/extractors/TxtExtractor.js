const fs = require("fs");

class TxtExtractor {
  static async extract(file) {
    return fs.readFileSync(file.path, "utf-8");
  }
}

module.exports = TxtExtractor;
