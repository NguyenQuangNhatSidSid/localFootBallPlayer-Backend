const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message;
  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      message,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      message,
    });
  }
};

module.exports = errorHandler;
