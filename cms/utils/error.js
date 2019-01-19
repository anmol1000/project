var errorEnum = require('../utils/error-code-enum');

module.exports = {

    handleError: function (errorMessage, errorDetails) {
        var err = new Error(errorMessage);
        err.status = errorDetails.statusCode;
        err.error = errorDetails;
        return err;
    }
};