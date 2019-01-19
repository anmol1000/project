var express = require('express');
var router = express.Router();
var BoardService = require('../services/board-service');

router.post('/', async function(req, res, next) {
    try {
        var payload = req.body;
        var options = {
            name:payload.name,
            nativeName:payload.nativeName
        };
        var boardService = new BoardService();
        var response = await boardService.addBoard(options);
        res.send("Board successfully added");
    }catch (e) {
        res.send("Unable to add Board" + e.message);
    }
});

router.get('/', async function(req, res, next) {
    try {
        var resultFilter = "";
        if (req.query){
            var resultFilter = req.query.filter;
        }
        var boardService = new BoardService();
        var response = await boardService.getBoard(resultFilter);
        res.send(response);
    }catch (e) {
        res.send("Unable to add Board" + e.message);
    }
});

module.exports = router;