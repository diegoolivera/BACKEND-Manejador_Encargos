class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const catchAsyncErrors = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.error(err);
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Se produjo un error inesperado';
      res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
      });
    });
  };
  
  module.exports = {
    ErrorHandler,
    catchAsyncErrors,
  };
  