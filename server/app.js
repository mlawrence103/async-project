const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allow browser to request static assets from public directory
app.use(express.static(path.join(__dirname, '../public')));

// sends index.html
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '../public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
