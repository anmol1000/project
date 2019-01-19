var express = require('express');
var router = express.Router();
var UserService = require('../services/users-service');

router.post('/', async function(req, res, next) {
    try {
        var payload = req.body;
        var options = {
            name:payload.name,
            email:payload.email,
            contactNumber:payload.contactNumber,
            address:payload.address,
            designation:payload.designation
        };
        var userService = new UserService();
        var response = await userService.addUser(options);
        res.send("User successfully added");
    }catch (e) {
        res.send("Unable to add User" + e.message);
    }
});

router.get('/', async function(req, res, next) {
    try {
        var resultFilter = "";
        if (req.query){
            var resultFilter = req.query.filter;
        }
        var userService = new UserService();
        var response = await userService.getUsers(resultFilter);
        res.send(response);
    }catch (e) {
        res.send("Unable to add User" + e.message);
    }
});

module.exports = router;