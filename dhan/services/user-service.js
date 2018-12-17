var models = require('../config/db');
var User = models.User;
var Role = models.Role;
var Service = models.Service;
var UserServiceRole = models.UserServiceRole;
var RoleService = require('./role-service');
var Services = require('./services');
var roleEnum = require('../utils/role-enum');
var services = new Services();
var _ = require('underscore');
var ErrorHandler = require('../utils/error');

var UserService = (function () {
    function UserService() {
    }

    UserService.prototype.addUserMapping = function (options, callback) {
        var services = new Services();
        var roleService = new RoleService();
        var userId = options.userId;
        var role = options.role;
        var sUid = options.serviceUid;
        services.getByUid(sUid, function (error, success) {
            if (error) {
                return callback(error, null);
            }
            log.info(success);
            var serviceId = success.id;
            log.info(serviceId);
            roleService.getRolebyName(role, function (err, succ) {
                if (err) {
                    return callback(err, null);
                }
                log.info("In role");
                var roleId = succ.id;
                var newUserServiceRole = UserServiceRole.build({
                    userId: userId,
                    roleId: roleId,
                    serviceId: serviceId
                });
                newUserServiceRole.save().then(function (result) {
                    return callback(null, result);
                }).catch(function (error) {
                    log.error(error);
                    var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                    return callback(err, null);
                });
            })
        });
    };

    UserService.prototype.addUser = function (options, callback) {

        /*
         TODO : move to transactions
         */

        var username = options.username;
        var email = options.email;
        var serviceUid = options.serviceUid;
        var role = options.role;
        var self = this;

        User.findOrCreate({
            where:{
                email:email
            },
            defaults:{
                username:username
            }
        }).then(function (success) {
            success = JSON.parse(JSON.stringify(success));
            var newUserId = success[0].id;
            self.addUserMapping({userId: newUserId, role: role, serviceUid: serviceUid}, function (error, result) {
                return callback(null, result);
            });
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.INVALID_REQUEST);
            return callback(err, null);
        });
    };

    UserService.prototype.getAll = function (email, callback) {

        User.findAll({
            where: {
                email: email,
                isActive: true
            },
            include: [{
                model: UserServiceRole,
                attributes: ['serviceId', 'roleId'],
                include: [
                    {
                        model: Service,
                        attributes: ['id', 'name', 'sUid' , 'bgColor' , 'dp' , 'logo' , 'desc']
                    },
                    {
                        model: Role,
                        attributes: ['id', 'name']
                    }
                ]
            }]
        }).then(function (result) {
            result = JSON.parse(JSON.stringify(result));
            if (result) {
                log.info("Result is " + JSON.stringify(result));
                return callback(null, result);
            }
            else {
                var message = "User not found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.FORBIDDEN);
                return callback(err, null);
            }
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };


    UserService.prototype.findUser = function (options, callback) {

        var email = options.email;

        User.find({
            where: {
                email: email,
                isActive: true
            }
        }).then(function (success) {
            if (success) {
                callback(null, success.dataValues);
            }
            else {
                var message = "User not found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.FORBIDDEN);
                return callback(err, null);
            }
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        })

    };

    UserService.prototype.checkHierarchy = function (req, callback) {

        if (req.user.isAdmin) {
            return callback(null, "Allow User");
        }
        var payload = req.body;
        var serviceToValidate = req.service.serviceUid;
        var roleToValidate = payload.role;

        log.info(req.user.UserServiceRoles);

        var validUser = _.some(req.user.UserServiceRoles, function (el) {
            if (el.Service.sUid === serviceToValidate) {
                var currentUserRole = roleEnum.get(el.Role.name).value;
                var roleToBeAdded = roleEnum.get(roleToValidate).value;
                return currentUserRole <= roleToBeAdded;
            }
        });

        if (validUser) {
            return callback(null, "Allow User");
        }
        else {
            var message = "Insufficient Permission";
            log.error(message);
            var err = ErrorHandler.handleError(message, serviceErrors.FORBIDDEN);
            return callback(err, null);
        }
    };

    return UserService;
})();

module.exports = UserService;
