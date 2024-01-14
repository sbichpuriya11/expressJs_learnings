const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next) => {
  let err = { ...error };

  err.message = error.message;
  //Log to console for dev
  console.log(error.stack.red);

  // Mongoose bad ObjectId
  if (error.name === "CastError") {
    const message = `No such record found with provided Bootcamp Id ${error.value}`;
    err = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const message = `Duplicate field value entered`;
    err = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((value) => value.message);
    err = new ErrorResponse(message, 400);
  }
  return res.status(err.statusCode || 500).json({
    success: false,
    err: err.message || "Server Error",
  });
};

module.exports = errorHandler;
