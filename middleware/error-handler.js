const customAPIError = require('../errors/custom-error');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof customAPIError) {
    return res.status(error.statusCode).send({ msg: error.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Something went wrong!!! Try again!!!' });
};

module.exports = errorHandlerMiddleware;
