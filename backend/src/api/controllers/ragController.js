exports.testRAG = (req, res) => {
  res.json({
    message: "RAG API working",
    vectorStore: "not-initialized",
    status: "pending"
  });
};
