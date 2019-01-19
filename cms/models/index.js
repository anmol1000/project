const db = require('../utils/mongo-client');

var User = require('./users');
var Board = require('./board');
var Medium = require('./medium');
var Subject = require('./subjects');

module.exports = {
    User,
    Board,
    Medium,
    Subject
};
