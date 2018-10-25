var express = require('express');
var router = express.Router();
var MediumService = require('../services/medium-service');

router.post('/', async function(req, res, next) {
    try {
        var payload = req.body;
        var options = {
            name:payload.name,
            nativeName:payload.nativeName
        };
        var mediumService = new MediumService();
        var response = await mediumService.addMedium(options);
        res.send("Medium successfully added");
    }catch (e) {
        res.send("Unable to add Medium" + e.message);
    }
});

router.get('/', async function(req, res, next) {
    try {
        var resultFilter = "";
        if (req.query){
            var resultFilter = req.query.filter;
        }
        var mediumService = new MediumService();
        var response = await mediumService.getMedium(resultFilter);
        res.send(response);
    }catch (e) {
        res.send("Unable to add Medium" + e.message);
    }
});

module.exports = router;