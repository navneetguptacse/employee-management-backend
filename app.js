var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var mongoose = require('mongoose');

var app = express();
mongoose.connect("mongodb://0.0.0.0:27017/employee").then(() => {
    console.log('Database connection established!');
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
