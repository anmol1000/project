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

    async clientCommented ({channelName, userName, commentText}) {
        var channelService = new ChannelService();
        var userService = new UserService();
        var channel = await  channelService.getChannelByName({channelName});
        var channelList = await ChannelMapper.find({
            channel
        });
        var usersInChannelList = await Promise.all (channelList.map( channel => {
            var userId = channel.user;
            return userService.getUserById({userId}, function (userList) {
                return userList;
            });
        }));

        await this.addComment({userName, channelName, commentText});

        var userNamesInChannelList = usersInChannelList.map(userInChannelList => userInChannelList.username);
        connectedWebSocketUsers.forEach((data) => {
            // Intersection of users in channel and user in Websocket client;
            var username = Object.keys(data)[0];
            if (userNamesInChannelList.includes(username) && username != userName){
                data[username].send(JSON.stringify({
                    channelName,
                    commentText
                }));
            }
        });
    }
}

module.exports = CommentService;