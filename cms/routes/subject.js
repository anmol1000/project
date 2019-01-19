var express = require('express');
var router = express.Router();
var SubjectService = require('../services/subject-service');

router.post('/', async function(req, res, next) {
    try {
        var payload = req.body;
        var options = {
            name:payload.name,
            nativeName:payload.nativeName
        };
        var subjectService = new SubjectService();
        var response = await subjectService.addSubject(options);
        res.send("Subject successfully added");
    }catch (e) {
        res.send("Unable to add Subject" + e.message);
    }
});

router.get('/', async function(req, res, next) {
    try {
        var resultFilter = "";
        if (req.query){
            var resultFilter = req.query.filter;
        }
        var subjectService = new SubjectService();
        var response = await subjectService.getSubject(resultFilter);
        res.send(response);
    }catch (e) {
        res.send("Unable to add Subject" + e.message);
    }
});

module.exports = router;