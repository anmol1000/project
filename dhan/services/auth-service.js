var randomstring = require("randomstring");
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var CLIENT_ID = config["CLIENT"].ID;
var client = new auth.OAuth2(CLIENT_ID);
var models = require('../models');
var Resource = models.Resource;
var Permission = models.Permission;
var User = models.User;
var PermissionMapping = models.PermissionMapping;
var Services = require('../services/services');
var UserService = require('../services/user-service');
var JsonService = require('../services/json-service');
var PermissionService = require('../services/permission-service');
var redisClient = require('../config/redis-client');
var ErrorHandler =  require('../utils/error');

var Auth = (function(){
  function Auth(){
  }


 Auth.prototype.authenticate = function(options , callback){

     var useremail = options.email;
     var googletoken = options.googletoken;

 	client.verifyIdToken(googletoken, CLIENT_ID, function(e, login) {
 		if (login){
 			console.log("login is "+ login);
	 		var x = login.getPayload();
	 		if (x['email'] == useremail){
	 			return callback(null, "Email is valid");
	 		}
	 		else{
                log.error("Authentication failed");
                var err = ErrorHandler.handleError("Authentication failed", serviceErrors.FORBIDDEN);
                return callback(err, null);
            }
	 	}
	 	else{
            log.error("Invalid Token");
            var err = ErrorHandler.handleError("Invalid Token", serviceErrors.FORBIDDEN);
            return callback(err, null);
        }
    });
 };

 Auth.prototype.generateToken = function(useremail, callback){
 		var authtoken = randomstring.generate(32);
        var authKey = "auth:" + authtoken;
 		redisClient.set(authKey, useremail);
        redisClient.expire(authKey, cmsConstants.EXPIRY_TIME);
 		return callback(null, authtoken);
 };

 Auth.prototype.expire = function(authtoken, callback){

     redisClient.get(authtoken, function (err, reply) {
         if (reply){
            redisClient.del(authtoken);
            var message = "Token deleted successfully";
            return callback(null, message);
         }
         else {
             log.error("Token not found");
             var err = ErrorHandler.handleError("Token not found", serviceErrors.FORBIDDEN);
             return callback(err, null);
         }
     });
 };

 Auth.prototype.generateLoginResponse = function (options, callback) {

     var email = options.email;
     var token = options.token;
     var username = options.username;
     var services = new Services();
     var userService = new UserService();
     var jsonService = new JsonService();
     var permissionService = new PermissionService();

     User.find({
         where:{
             email:email
         }
     }).then(function (success) {
         success = JSON.parse(JSON.stringify(success));
         if (success.isAdmin){
            services.getAll(function (error, success) {
                if (error){
                    return callback(error, null);
                }
                else if (success){
                    var response = {
                        username:username,
                        email:email,
                        token:token,
                        role:"admin",
                        services:success,
                        endpoints: config.PARTNER_TOOL_ENDPOINTS,
                    };
                    callback(null, response);
                }
            })
         } else {
            userService.getAll(email,function (error, success) {
                if (error){
                    return callback(error, null);
                }
                else if (success){
                    jsonService.getServiceRoleMapping(success, function (error, servicesResponse) {
                        var rolesMap = [];
                        for ( var i = 0; i < servicesResponse.length; i++ ){
                            rolesMap.push(servicesResponse[i].role);
                        }
                        permissionService.getAll(rolesMap, function (error, permissionResponse) {
                           if (error){
                               return callback(error, null);
                           }
                            var response = {
                                username:username,
                                email:email,
                                token:token,
                                services:servicesResponse,
                                rolePermissions:permissionResponse,
                                endpoints: config.PARTNER_TOOL_ENDPOINTS,
                            };
                           return callback(null, response);
                        });

                    });
                }
            });
         }
     }).catch(function (error) {
         log.error(error);
         var err = ErrorHandler.handleError(error.errors[0].message, serviceErrors.UNKNOWN_SERVER_ERROR);
         return callback(err, null);
     });

 };
 return Auth;
})();

module.exports = Auth;