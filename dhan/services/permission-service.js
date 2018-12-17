var models = require('../config/db');
var Resource = models.Resource;
var PermissionResource = models.PermissionResource;
var Role = models.Role;
var RolePermission = models.RolePermission;
var ResourceService = require('../services/resource-service');
var ErrorHandler =  require('../utils/error');

var PermissionService = (function() {
    function PermissionService() {
    }

    PermissionService.prototype.addPermission = function (options, callback) {

        var resource = options.resource;
        var permission = options.permission;
        var resourceservice = new ResourceService();
        resourceservice.findByName(resource, function (error, succ) {
            if (error){
                return callback(error, null);
            }
            var resourceId = succ.id;
            var newPermission = PermissionResource.build({
                code: permission,
                resourceId: resourceId
            });
            newPermission.save().then(function (success) {

                var message = "Permission successfully added with id-----" + success.dataValues.id;
                return callback(null, message);

            }).catch(function (error) {
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            });
        });
    };

    PermissionService.prototype.getPermissionforRole = function (role, callback) {
        var jsonService = new JsonService();

        PermissionResource.findAll({
            include:[{
                model:RolePermission,
                include:[{
                    model:Role,
                    where:{
                        name:role
                    }
                }]
            }]
        }).then(function(rolewisePermission){
            rolewisePermission = JSON.parse(JSON.stringify(rolewisePermission));

            if (rolewisePermission){

                jsonService.getPermissionforRole(rolewisePermission, function (error, jsonresult) {
                    if (error){
                        return callback(error, null);
                    }
                    return callback(null, jsonresult);
                });
            }
            else{
                var message = "Permission not found";
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

    PermissionService.prototype.getAll = function (roles, callback) {

        var self = this;
        var rolePermissions = [];
        for (i = 0; i < roles.length; i++){
            self.getPermissionforRole(roles[i], function (error, success) {
                if (error){
                    return callback(error, null)
                }
                rolePermissions.push(success);
                if(rolePermissions.length == roles.length) {
                    return callback(null, rolePermissions);
                }
            });
        }
    };

    PermissionService.prototype.getPermission = function (req, callback) {

        PermissionResource.findAll({raw:true}).then(function (result) {
            result = JSON.stringify(result);
            if (result){
                return callback(null, result);
            }
            else{
                var message = "Permission not found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                return callback(err, null);
            }

        }).catch(function(error){
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });
    };

    PermissionService.prototype.addPermissionforRole = function (options, callback) {

        var role = options.role;
        var permission = options.permission;
        Role.find({
            where:{
                name:role
            }
        }).then(function (success) {
            success = JSON.parse(JSON.stringify(success));
            if (!success){
                var message = "Role Not found";
                log.error(message);
                var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                return callback(err, null);
            }
            var roleId = success.id;
            PermissionResource.find({
                where:{
                    code:permission
                }
            }).then(function (succ) {
                succ = JSON.parse(JSON.stringify(succ));
                if (!succ){
                    var message = "Permission not found";
                    log.error(message);
                    var err = ErrorHandler.handleError(message, serviceErrors.INVALID_REQUEST);
                    return callback(err, null);
                }
                var permissionId = succ.id;
                var newPermissionMapping = RolePermission.build({
                    roleId: roleId,
                    permissionId:permissionId
                });
                newPermissionMapping.save({raw:true}).then(function (success) {
                    log.info(success);
                    return callback(null, success);
                }).catch(function (error) {
                    log.error(error);
                    var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                    return callback(err, null);
                })
            }).catch(function(error){
                log.error(error);
                var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
                return callback(err, null);
            });
        }).catch(function (error) {
            log.error(error);
            var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
            return callback(err, null);
        });

    };
    return PermissionService;

})();

module.exports = PermissionService;