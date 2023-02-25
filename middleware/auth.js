const jwt = require('jsonwebtoken');
const { BadRequest, Unauthorized } = require('../errors');

const authenticationMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new BadRequest('no token provided');
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthorized('not authorized to access this route');
  }
};

module.exports = authenticationMiddleWare;
