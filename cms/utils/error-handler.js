module.exports = {

    handleError: function (statusCode, errorCode, errorMessage, callback) {
        var err = new Error(errorMessage);
        err.status = statusCode;
        err.error = errorCode;
        return callback(err);
    },
    handleRequestError: function (options, callback) {
        var error;
        if (options.err) {
            error = new Error(serviceErrors.UNKNOWN_SERVER_ERROR.message);
            error.status = serviceErrors.UNKNOWN_SERVER_ERROR.statusCode;
            error.error = serviceErrors.UNKNOWN_SERVER_ERROR.code;
            return callback(error, null);
        }

        if (options.resp.statusCode >= 300) {
            error = new Error(options.body.errorMessage);
            error.status = options.resp.statusCode;
            error.error = options.body.error;
            return callback(error, null);
        }
    }
};
