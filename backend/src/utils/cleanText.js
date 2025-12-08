module.exports = function cleanText(text) {
  return text
    .replace(/\s+/g, " ")   // colapsa espacios
    .replace(/\n+/g, " ")   // remueve saltos
    .trim();
};
