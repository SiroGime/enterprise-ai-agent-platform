module.exports = function chunkText(text, size = 500) {
//Divide en trozos de 500 caracteres (ajustable)

  const chunks = [];
  
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.substring(i, i + size));
  }

  return chunks;
};