const express = require('express');

const dbRouter = require('./notes');

const app = express();

app.use('/notes', dbRouter);

module.exports = app;