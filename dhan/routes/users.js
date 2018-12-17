var express = require('express');
var router = express.Router();
var db = require('../config/db');
var User = db.User;
var acl = require('../middleware/acl')();
var UserService = require('../services/user-service');
var Services = require('../services/services');
var JsonService = require('../services/json-service');


router.post('/', acl.validate(), function (req, res, next) {
    var payload = req.body;
    var username = payload.username;
    var email = payload.email;
    var serviceUid = req.get('X-Service-Id');
    var role = payload.role;
    var userService = new UserService();

    userService.checkHierarchy(req, function (error, result) {
        if (error) {
            return next(error);
        }
        var request = {
            username: username,
            email: email,
            serviceUid: serviceUid,
            role: role
        };

        userService.addUser(request, function (err, success) {
            if (err) {
                return next(err);
            }
            return res.status(200).send(success);
        });
    });
});

router.get('/', acl.validate(), function (req, res, next) {

    var services = new Services();
    var serviceUid = req.service.serviceUid;
    var jsonservice = new JsonService();

    services.getUsersbyService(serviceUid, function (error, success) {

        if (error) {
            return next(error);
        }
        //console.log(success);
        jsonservice.getUsers(success, function (error, jsonresult) {
            return res.status(200).send(jsonresult);
        });
    });
});

router.post('/admin', function (req, res, next) {

    var payload = req.body;
    var newUser = User.build({
        email: payload.email,
        username: payload.name,
        isAdmin: true
    });

    newUser.save().then(function (success) {
        success = JSON.parse(JSON.stringify(success));
        console.log(success.isActive);
        var id = success.id;
        return res.status(200).send(id);
    }).catch(function (error) {
        return next(error);
    });
});

module.exports = router;