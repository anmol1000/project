var Comment = require('../models/comment');
var UserService = require('../services/user-service');
var ChannelService = require('../services/channel-service');
var ChannelMapper = require('../models/user-channel-mapper');

class CommentService {
    constructor(){

    }

    async addComment({userName, channelName, commentText}){
        try{
            var userService = new UserService();
            var channelService = new ChannelService();

            var user = await userService.getUserByName({
                userName
            });
            var channel = await channelService.getChannelByName({
                channelName
            });

            var comment = new Comment({
                user, channel, text:commentText
            });
            var newComment = await comment.save();
            return newComment;
        } catch (e) {
            throw e;
        }

    }

    async getComment ({channelName}){
        try{
            var channelService = new ChannelService();
            var channel = await channelService.getChannelByName({
                channelName
            });
            var comment = await Comment.find({
                channel
            });
            return comment;
        } catch (e) {

        }
    }

    async clientCommented ({channelName}) {
        var channelService = new ChannelService();
        var channel = await  channelService.getChannelByName({channelName});
        var channelList = await ChannelMapper.find({
            channel
        });
        //get All the users in the channel;
        var usersInChannel = channelList
        connectedWebSocketUsers.forEach((data) => {
            // Intersection of users in channel and user in Websocket client;
            var username = Object.keys(data)[0];
            data[username].send("This is the test");
        });
    }
}

module.exports = CommentService;