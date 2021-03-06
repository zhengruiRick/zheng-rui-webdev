var app = require('./express');
var express = app.express;

var bodyParser = require('body-parser');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var passport        = require('passport');

app.use(cookieParser());

app.use(session({
    secret: 'this is the secret', //process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));

// require("./test/app");
require("./project/app.js");
// require("./assignment/app.js");


port = process.env.PORT || 3000;
app.listen(port);