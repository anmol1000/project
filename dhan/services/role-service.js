var models = require('../models');
var Services = require('../services/services');
var UserServiceRole = models.UserServiceRole;
var Service = models.Service;
var Role = models.Role;
var User = models.User;
var ErrorHandler =  require('../utils/error');

var RoleService = (function () {
    function RoleService() {
    }

    RoleService.prototype.getRoleId = function (options,callback) {

        var services = new Services();
        var userId = options.userId;
        var serviceUid = options.serviceUid;
        services.getByUid(serviceUid, function (error, serviceResult) {
            if (serviceResult != undefined) {
                var serviceId = serviceResult.id;
            }
            else {
                var message = "Entry not found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                return callback(err, null);
            }
            UserServiceRole.find({
                where: {
                    userId: userId,
                    serviceId: serviceId
                },
                raw: true
            }).then(function (result) {
                if (result != undefined) {
                    return callback(null, result.roleId);
                }
                else {
                    var message = "Insufficient Permission";
                    log.error(message);
                    var err = ErrorHandler.handleError(message, serviceErrors.FORBIDDEN);
                    return callback(err, null);
                }
            }).catch(function (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            });
        });
    };

    RoleService.prototype.getAll = function (callback) {

        Role.findAll().then(function (result) {
            return callback(null, result);
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    RoleService.prototype.getRolebyName = function (userRole, callback) {
        Role.find({
            where: {
                name: userRole
            },
            raw: true
        }).then(function (success) {
            return callback(null, success);
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    RoleService.prototype.addRole = function (newRole, callback) {

        newRole.save({raw: true}).then(function (success) {
            var message = "Role added with id:" + success.id;
            log.info(message);
            return callback(null, message);
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    RoleService.prototype.checkRole = function (userId, userRole, serviceUid, callback) {

        var services = new Services();

        if (userRole === "admin") {
            User.findById(userId, function (success) {
                success = JSON.stringify(success);
                if (success.isAdmin === true) {
                    return callback(null, "User is admin")
                }
            }).catch(function (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            });
        }

        services.getByUid(serviceUid, function (error, result) {
            if (error) {
                return callback(error, null);
            }
            var serviceId = result.id;
            UserServiceRole.find({
                where: {
                    userId: userId,
                    serviceId: serviceId
                },
                include: [{
                    model: Role
                }]
            }).then(function (success) {
                return callback(null, success);
            }).catch(function (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            })
        });

    };

    return RoleService;
})();

module.exports = RoleService;
