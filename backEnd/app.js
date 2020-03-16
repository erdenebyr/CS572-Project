const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const router = require('./routes/mainRouter');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.listen(port, () => {
  console.log(`The server is running on the port ${port}`)
});

module.exports = app;