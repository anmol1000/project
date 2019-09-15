/*
 libraries
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");
var WebSocket = require('ws');
/*
 global variables
 */
global.config = require('./config/env.json')[process.env.NODE_ENV || 'development'];
global.log = require('./utils/log.js');

/*
 routes
 */

var auth = require('./routes/auth');
var channel = require('./routes/channel');
var comment = require('./routes/comment');
var user = require('./routes/user');
var ping = require('./routes/ping');
var channelService = require('./services/channel-service');

var app = express();
var channelsApp = express();

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
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(__dirname + "../client/public"));
app.use('/ping' , ping);



var initialRoutes = ['/v1', '/api/v1'];
app.use(initialRoutes, channelsApp);
channelsApp.use('/user', user);
channelsApp.use('/channel', channel);
channelsApp.use('/comment', comment);
channelsApp.use('/', auth);


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

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        statusCode: err.status,
        error: err.error,
        errorMessage: err.message
    });
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log("message sent by client is: ", message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
}).on('error', (error) =>{
    console.log(error);
});

server.listen(config["CHANNELS"].PORT, function () {

    log.info('Ready on port %d', server.address().port);

});

module.exports = app;
