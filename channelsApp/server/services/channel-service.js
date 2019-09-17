var Channel = require('../models/channel');
var UserService = require('../services/user-service');
var ChannelMapper = require('../models/user-channel-mapper');

class ChannelService {
    constructor(){

    }
    async addChannel({channelName, channelType}){
        try{
            const channel = new Channel({
                name:channelName,
                type:channelType
            });
            let newChannel = await channel.save();
            return newChannel;
        }
        catch (error) {
            throw error;
        }
    }

    async joinChannelForUser({channelName, userName, admin = false, active = true}){

        try{
            var userService = new UserService();
            var user = await userService.getUserByName({
                userName:userName
            });
            var channel = await this.getChannelByName({
                channelName
            });
            const channelMapper = new ChannelMapper({
                user, channel, admin, active
            });
            var newChannelMapper = await channelMapper.save();
            return newChannelMapper;

        } catch (e) {


        }
    }

    async getChannelByName ({ channelName }) {
        try{
            var channel = await Channel.find({
                name: channelName
            });
            return channel[0];

        }catch (e) {

        }
    }

    async getChannelsJoinedByUser({userName}){
        try{
            var userService = new UserService();
            var user = await userService.getUserByName({userName});
            var channelList = await ChannelMapper.find({
                user
            });
            var channelListWithDetails = await Promise.all(channelList.map((channelMapper) => {
                return Channel.find({
                    '_id':channelMapper.channel
                });
            }));
            var cleanedChannelList = channelListWithDetails.map((updatedChannelList) => updatedChannelList[0]);
            return  cleanedChannelList;
        }catch (e) {
            throw e;
        }
    }

    async getPublicChannelsNotJoinedByUser({userName}){
        try{
            var userService = new UserService();
            var user = await userService.getUserByName({userName});
            var channelList = await ChannelMapper.find({
                user:user._id
            });
            var channelListIds = channelList.map(channelList => channelList.channel.toString());
            var allChannels = await this.getChannels();
            var allChannelsNotJoined = [];
            allChannels.forEach((allChannel) => {
                if (!channelListIds.includes(allChannel._id.toString())){
                    allChannelsNotJoined.push(allChannel);
                }
            })
            return  allChannelsNotJoined;
        }catch (e) {

        }
    }

    async getChannels(searchString = ""){
        try {
            var channelList = await Channel.find({
                name: {
                    $regex: '.*' + searchString + '.*'
                }
            });
            return channelList;
        }catch (error) {
            throw error;
        }
    }
}

module.exports = ChannelService;