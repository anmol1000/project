var express = require('express');
var router = express.Router();
var UserService = require('../services/user-service');

router.post('/', async function(req, res, next) {
    var userService= new UserService();
    var payload = req.body;
    var options = {
        userName:payload.name,
        userPassword:payload.password
    };
    console.log(req);
    var response = await userService.addUser(options);
    res.send("User successfully added");

});

router.get('/', async function(req, res, next){
    try{
        var userService = new UserService();
        var resultFilter = "";
        if (req.query){
            var resultFilter = req.query.filter;
        }
        var response = await userService.getUserByName(resultFilter);
        res.send(response);
    } catch (e) {
        res.send("Unable to add Channel" + e.message);
    }

});

module.exports = router;
