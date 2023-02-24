require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const mainRouter = require('./routes/main');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middlewares
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1', mainRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
