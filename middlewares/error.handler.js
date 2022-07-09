const logError = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      error: err.output.payload.message,
    });
  } else {
    res.status(500).json({
      error: err.message,
    });
  }
};

export { logError, errorHandler };
