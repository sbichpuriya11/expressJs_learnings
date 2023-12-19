const {
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  SERVER_UNAVAILABLE,
} = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case BAD_REQUEST:
      res.json({
        title: "Bad request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case UNAUTHORIZED:
      res.json({
        title: "User unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case SERVER_UNAVAILABLE:
      res.json({
        title: "Service Unavailable",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      break;
  }
};

module.exports = errorHandler;
