var express = require('express');
var router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config['CLIENT_ID']);

router.post('/login', function(req, res, next) {
    var googleToken = req.header('X-Auth-Token');
    var email = req.email;
    //verify if email is present
    //verify google token
    //create session
});

router.post('/logout', function(req, res, next){
  var googletoken = req.header('X-Auth-Token');
  //destroy session
});

module.exports = router;
