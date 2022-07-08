const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      message: err.output.payload,
    });
  }
  next(err);
};

export { logError, errorHandler, boomErrorHandler };
