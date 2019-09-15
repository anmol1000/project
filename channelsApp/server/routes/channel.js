var express = require('express');
var router = express.Router();
var ChannelService = require('../services/channel-service');


// This API is for creating channel
router.post('/', async function(req, res, next) {
    var channelService= new ChannelService();
    var payload = req.body;
    var options = {
        channelName:payload.name,
        channelType:payload.type
    };
    var response = await channelService.addChannel(options);
    res.send("Channel successfully added");

});

// API for joining a channel

router.post('/join', async function (req, res, next) {

    try{
        var channelService = new ChannelService();
        var payload = req.body;
        var options = {
            channelName: payload.channelName,
            userName : payload.userName
        };
        var addChannel = await channelService.joinChannelForUser(options);
        res.send(addChannel);
    }catch (e) {

    }

});

// This API  is used to get all the channels
router.get('/', async function(req, res, next){
    try{
        var channelService = new ChannelService();
        var resultFilter = "";
        if (req.query){
            var resultFilter = req.query.filter;
        }
        var response = await channelService.getChannels(resultFilter);
        res.send({
            channels:response
        });
    } catch (e) {
        res.send("Unable to add Channel" + e.message);
    }

});

// This API is used to get all the channels joined by a particular user.

router.get('/user/:userName', async function (req, res, next) {
    try{
        var channelService = new ChannelService();
        var userName = req.params.userName;
        var channelList = await channelService.getChannelsJoinedByUser({userName});
        res.send({
            channels:channelList
        });
        
    }catch (e) {
        throw e;
    }

});

router.get('/notUser/:userName', async function (req, res, next) {
    try{
        var channelService = new ChannelService();
        var userName = req.params.userName;
        var channelList = await channelService.getPublicChannelsNotJoinedByUser({userName});
        res.send({
            channels:channelList
        });
    }catch (e) {

    }

});

module.exports = router;
