var express = require('express');
var router = express.Router();
var CommentService = require('../services/comment-service');


// This API is for creating comment
router.post('/', async function(req, res, next) {
    var commentService= new CommentService();
    var payload = req.body;
    var options = {
        userName:payload.userName,
        channelName:payload.channelName,
        commentText: payload.commentText
    };
    var response = await commentService.addComment(options);
    res.send("Comment successfully added");

});

//This API is for getting comments for a particular Channel

router.get('/:channelName', async function(req, res, next){
    try{
        var commentService = new CommentService();
        var channelName = req.params.channelName;
        var response = await commentService.getComment({channelName});
        res.send({
            comments:response
        });
    } catch (e) {
        res.send("Unable to add Channel" + e.message);
    }

});

module.exports = router;
