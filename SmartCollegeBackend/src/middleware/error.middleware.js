// module.exports = (err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// };


module.exports = (err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
