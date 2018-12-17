var models = require('../config/db');
var Resource = models.Resource;
var ErrorHandler =  require('../utils/error');

var ResourceService = (function(){
    function ResourceService(){

    }

    ResourceService.prototype.addResource = function (newResource, callback) {

        newResource.save().then(function (success, error) {

            success = JSON.parse(JSON.stringify(success));
            var message = "Resouce successfully added with id " + success.id;
            return callback(null, message);

        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    ResourceService.prototype.findByName  = function (resourceName, callback) {
        Resource.find({
            where:{
                name:resourceName
            }
        }).then(function (success) {
            success = JSON.parse(JSON.stringify(success));
            if (success){
                console.log(success);
                return callback(null, success);
            }
            else{
                var message = "Resource not found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                return callback(err, null);
            }

        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };
    return ResourceService;
})();

module.exports = ResourceService;





