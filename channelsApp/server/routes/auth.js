var express = require('express');
var router = express.Router();
var UserService = require('../services/user-service');


router.post('/login', async function(req, res, next) {

    try{
        var userService = new UserService();
        var payload = req.body;
        var user = await userService.getUserByName({
            userName: payload.name
        });
        console.log("User is ", user.password);
        if (user.password === payload.password){
            res.send({
                auth: true,
                user: user
            });
        }
        res.send({
            auth: false
        })

    } catch (e) {
        res.send({
            auth: false
        })

    }


});

router.post('/logout', function(req, res, next){

});

module.exports = router;
