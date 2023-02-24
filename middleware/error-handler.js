const customAPIError = require('../errors/custom-error');
const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof customAPIError) {
    return res.status(error.statusCode).send({ msg: error.message });
  }
  res.status(500).json({ msg: 'Something went wrong!!! Try again!!!' });
};

module.exports = errorHandlerMiddleware;
