var express = require('express');
var router = express.Router();
var UserService = require('../services/users-service');

router.post('/', function(req, res, next) {
    var options = {
        name:req.name,
        email:req.email,
        contactNumber:req.contactNumber,
        address:req.address,
        designation:req.designation
    };
    var userService = new UserService();
    var response = userService.addUser(options);
});

module.exports = router;