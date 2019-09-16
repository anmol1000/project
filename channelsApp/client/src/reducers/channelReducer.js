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
        case constants.USER_COMMENTED:
            // var addedComment;
            // if (state.commentsForSelectedChannel.length > 0){
            //     addedComment = state.commentsForSelectedChannel[0];
            //     addedComment.text = action.payload;
            // }
            // else {
            //     addedComment = {
            //         text:action.payload
            //     };
            // }
            // var newComments = state.commentsForSelectedChannel.push(addedComment);
            // return {
            //     ...state,
            //     commentsForSelectedChannel:newComments
            // };
            return state;
        case constants.INCOMING_COMMENT:
            return state;
        default:
            return state
    }
}