/*
 libraries
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
/*
 global variables
 */
global.config = require('./config/env.json')[process.env.NODE_ENV || 'development'];

global.log = require('./utils/log.js');
global.serviceErrors = require("./utils/service-error");
global.cmsConstants = require("./utils/constants");
global.FileUtils = require("./utils/file-utils");

/*
 routes
 */
var article = require('./routes/article');

var app = express();
var cmsApp = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-Service-Id , api_key");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
});

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public/app"));

if (!fs.existsSync(config['FILE_UPLOAD_PATH'])){
    fs.mkdirSync(config['FILE_UPLOAD_PATH']);
}


var initialRoutes = ['/v1', '/api/v1'];
app.use(initialRoutes, cmsApp);
cmsApp.use('/articles', article);

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    log.error(err);

    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            statusCode: err.status,
            error: err.error,
            errorMessage: err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        statusCode: err.status,
        error: err.error,
        errorMessage: err.message
    });
});
var server = app.listen(config["CMS"].PORT, function () {

    log.info('Ready on port %d', server.address().port);

    // new CronService().start();
});

module.exports = app;
