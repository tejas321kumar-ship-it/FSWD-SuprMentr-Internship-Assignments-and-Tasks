function errorHandler(err, req, res, next) {
  if (err && err.status && err.message) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Something went wrong" });
}

module.exports = errorHandler;
