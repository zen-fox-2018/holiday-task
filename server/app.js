const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const body = require('body-parser');
const cors = require('cors')

const indexRoutes = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

module.exports = app;
