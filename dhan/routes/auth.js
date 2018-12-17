var express = require('express');
var router = express.Router();
var AuthService = require('../services/auth-service');
var UserService = require('../services/user-service');

router.post('/signup', function(req, res, next) {
  var authService = new AuthService();
  var userService = new UserService();
  var payload = req.body;

  var isValidUser = userService.validateUser(payload);
  //generate unique code for user
  //push user to table


module.exports = router;
