var express = require('express');
var router = express.Router();
var AuthService = require('../services/auth-service');
var UserService = require('../services/user-service');


router.post('/login', function(req, res, next) {
    var authService = new AuthService();
    var userService = new UserService();
    var username = req.body.username;
    var password = req.body.password;


});

router.post('/logout', function(req, res, next){
    var authservice = new AuthService();

});

module.exports = router;
