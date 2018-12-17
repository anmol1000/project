module.exports = Object.freeze({
    INVALID_REQUEST: {
        code: 'INVALID_REQUEST',
        message : 'invalid request',
        statusCode:400
    },
    UNKNOWN_SERVER_ERROR : {
        code: 'UNKNOWN_SERVER_ERROR',
        message : 'unknown error',
        statusCode:500
    },
    FORBIDDEN : {
        code: 'FORBIDDEN',
        message : 'user is not authorised',
        statusCode:403
    }
});