var Comment = require('../models/comment');
var UserService = require('../services/user-service');
var ChannelService = require('../services/channel-service');

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
}

module.exports = CommentService;