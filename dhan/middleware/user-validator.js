var models = require('../models');
var Resource = models.Resource;
var RolePermission = models.RolePermission;
var User = models.User;
var PermissionResource = models.PermissionResource;
var RoleService = require('../services/role-service');
var Services = require('../services/services');


function userValidator() {
    return {
        create: function () {
            return function (req, res, next) {

                var services = new Services();
                var roleService = new RoleService();
                var serviceId = req.service.serviceUid;
                var payload = req.body;
                var username = payload.username;
                var email = payload.email;
                var role = payload.role;

                if (!(serviceId && username && email && role)){
                    return res.status(403).send({message:"In sufficient parameters. Please provide full parameters"});
                }

                services.getById(serviceId,function (error, success) {

                    if (error){
                        return res.status(403).send({message:"Invalid Service."})
                    }
                    else if (!success){
                        roleService.getRolebyName(role, function (err, succ) {
                            if (err){
                                return res.status(403).send({message:"Role does not exist"});
                            }
                            else if (succ){
                                return next();
                            }
                        })
                    }
                });
            }
        }
    }
}

module.exports = userValidator;


