var models = require('../config/db');
var Service = models.Service;
var UserServiceRole = models.UserServiceRole;
var JsonService = require('../services/json-service');
var Role = models.Role;
var User = models.User;
var ZK = require('../utils/zk-utils');
var ErrorHandler = require('../utils/error');

var Services = (function () {
    function Services() {
    }

    Services.prototype.create = function (options, callback) {

        var jsonService = new JsonService();
        var newService = options.newService;
        var userSegment = options.userSegment;
        var serviceName = options.newService.name;
        newService.save().then(function (success) {
            success = JSON.parse(JSON.stringify(success));
            var message = "Service successfully added with id " + success.id;
            jsonService.getService(success, function(error, jsonResult){
                var responseData = {
                    message: message,
                    services:jsonResult
                };
                var zkPath = config["ZOOKEEPER"].BASE_PATH + cmsConstants.SLASH + serviceName;
                var zkRequest = {
                    path:zkPath,
                    value:userSegment
                };
                ZK.createNode(zkPath, function (error, success) {

                    ZK.setValue(zkRequest, function (error, success) {
                        if (error){
                            return callback(error, null);
                        }
                        return callback(null, responseData);
                    });
                });
            });
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    Services.prototype.update = function (serviceUid, payload, callback) {
        /*
         service name and id can't be updated
         */
        Service.update(
            {
                desc: payload.desc,
                dp: payload.dp,
                logo:payload.logo,
                bgColor:payload.bgColor
            },
            {
                where: {
                    sUid: serviceUid
                }
            }).then(function (result) {
            log.debug(result[0]);
            var message;
            if (result[0] == 1) {
                message = "Service successfully updated";
            } else {
                var message = "Service Updation failed";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            }
            return callback(null, message);

        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.INVALID_REQUEST);
            return callback(err, null);
        });
    };

    Services.prototype.delete = function (serviceUid, callback) {
        Service.update(
            {
                isActive: false
            },
            {
                where: {
                    sUid: serviceUid
                }
            }).then(function (result) {
            log.debug(result[0]);
            var message;
            if (result[0] == 1) {
                message = "Service delete successfully";
            } else {
                var message = "Service deletion failed";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            }
            return callback(null, message);

        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    Services.prototype.getByUid = function (serviceUid, callback) {
        log.info("Service Id is " + serviceUid);
        if (serviceUid == undefined) {
            var message = "Service Id not found in the database.";
            log.error(message);
            var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
            return callback(err, null);
        }
        Service.find(
            {
                where: {
                    sUid: serviceUid
                }
            }).then(function (service) {
            service = JSON.parse(JSON.stringify(service));
            if (service) {
                return callback(null, service);
            }
            else {
                var message = "Service Id not found in the database.";
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

    Services.prototype.getByName = function (serviceName, callback) {
        Service.find(
            {
                where: {
                    name: serviceName
                }
            }).then(function (service) {
            if (service){
                return callback(null, service);
            }
            else{
                var message = "Service Id not found in the database.";
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

    Services.prototype.getAll = function (callback) {
        var jsonService = new JsonService();
        Service.findAll(
            {
                where: {
                    isActive: true
                },
                order: 'created_ts DESC'
            }).then(function (services) {
                if (services){
                    jsonService.getServices(services,function (error, jsonResult) {
                        if (error){
                            return callback(error, null);
                        }
                        else{
                            return callback(null, jsonResult)
                        }
                    });
                }
                else{
                    var message = "Service Id not found in the database.";
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

    Services.prototype.getUsersbyService = function (serviceUid, callback) {

        var services = new Services();

        services.getByUid(serviceUid, function (error, success) {
            if (error) {
                return callback(error, null);
            }
            var serviceId = success.id;
            User.findAll({
                where:{
                    isActive:true
                },
                include: [{
                    model: UserServiceRole,
                    where:{
                        serviceId:serviceId
                    },
                    include:[Service, Role]
                }]
            }).then(function (result) {
                if (result){
                    result = JSON.parse(JSON.stringify(result));
                    return callback(null, result);
                }
                else{
                    var message = "User not found in the database.";
                    log.error(message);
                    var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                    return callback(err, null);
                }

            }).catch(function (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            });
        });
    };

    return Services;
})();

module.exports = Services;
