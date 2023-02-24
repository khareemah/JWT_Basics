const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error');
const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new customAPIError('Please provide a value', 400);
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(200).send({ msg: 'user created', token });
};

const dashboard = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new customAPIError('no token provided', 401);
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}, Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new customAPIError('not authorized to access this route', 400);
  }
};

module.exports = { login, dashboard };