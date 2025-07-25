// Central error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);

  // Default to 500 if status code isn't set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = errorHandler;
