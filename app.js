// app.js
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const logger = require('morgan');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

const app = express();

// Logger (optional but helpful during dev)
app.use(logger('dev'));

// Set views location and view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register partials folder (header, footer, etc.)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Middleware to serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);
app.use('/', travelRouter);

// Basic error handler (optional but good practice)
app.use((req, res, next) => {
  res.status(404);
  res.render('error', { title: '404 - Page Not Found' });
});

module.exports = app;