var express = require('express');
var router = express.Router();

var pojo = function () {
    var members = arguments;

    return function () {
        var obj = {}, i = 0, j = members.length;
        for (; i < j; ++i) {
            obj[members[i]] = arguments[i];
        }

        return obj;
    };
};

router.post('/login', function(req, res, next) {

});

router.post('/logout', function(req, res, next){
  var googletoken = req.header('X-Auth-Token');
});

module.exports = router;
