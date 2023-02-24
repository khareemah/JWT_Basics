const notFound = (req, res) => res.status(400).send('Resource not found');

module.exports = notFound;
