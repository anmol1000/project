import constants from '../constants/actionTypes'

var initialState = {
    joinedChannels: [],
    selectedChannel: null,
    commentsForSelectedChannel: []
};

const mapChannelsStatusToRead =  (channelsList) => {
    return channelsList.map(channel => {
        return channel = {
            ...channel,
            isUnread: false,
            unreadCount: 0
        }
    });
};

export default (state = initialState, action) => {

    switch(action.type) {

        case constants.GET_USER_JOINED_CHANNELS_SUCCESS:
            var joinedChannels = action.payload;
            var updatedJoinedChannels = mapChannelsStatusToRead(joinedChannels);
            return {
                ...state,
                joinedChannels: updatedJoinedChannels,
                selectedChannel: updatedJoinedChannels[0]
            };

        case  constants.CHANNEL_SELECTED:
            var selectedChannel = action.payload;
            return {
                ...state,
                selectedChannel
            };
        case constants.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                commentsForSelectedChannel: action.payload
            };
        default:
            return state
    }
}