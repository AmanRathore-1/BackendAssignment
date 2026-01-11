const errorHandler = (err, req, res, next) => {
  console.error(err);

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists. Please use another ${field}.`
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);

    return res.status(400).json({
      success: false,
      message: messages.join(", ")
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default errorHandler;
