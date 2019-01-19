var Enum = require('enum');
var INVALID_REQUEST = 'Inva'
var errorEnum = new Enum({
    'INVALID_REQUEST': 400,
    'INTERNAL_SERVER_ERROR': 500,
    'FORBIDDEN': 403,
    'NOT_FOUND':404
});

module.exports = errorEnum;