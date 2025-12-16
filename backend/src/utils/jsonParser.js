function safeJSONParse(input) {
  // Si ya es objeto, devolverlo
  if (typeof input === "object" && input !== null) {
    return input;
  }

  // Si no es string, no se puede parsear
  if (typeof input !== "string") {
    return null;
  }

  try {
    // Intento directo
    return JSON.parse(input);
  } catch (e) {
    // Intento de rescate: extraer JSON del texto
    const match = input.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

module.exports = safeJSONParse;
