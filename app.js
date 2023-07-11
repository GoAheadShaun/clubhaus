var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'SocialClub'
});


var app = express();

app.use(function(req,res,next){
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'super secret string',
    secure: false
}));
app.use(function(req,res,next){
    console.log("The current user is "+req.session.clubid);
    next();
});


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);


module.exports = app;
