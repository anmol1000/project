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
            unreadCount: 0,
            unreadText:''
        }
    });
};

const addRecievedCommentFromUser = (channelsList, channelName, commentText) => {
    var newChannelsList = Object.assign({}, channelsList);
    return newChannelsList.map(channel => {
        if (channel.name === channelName){
            return {
                ...channel,
                isUnreadTrue: true,
                unreadCount: (channel.unreadCount)++,
                unreadText: commentText
            }
        }
    })
}

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
            var addedComment;
            if (state.commentsForSelectedChannel.length > 0){
                addedComment = Object.assign({}, state.commentsForSelectedChannel[0]);
                addedComment.text = action.payload;
            }
            else {
                addedComment = {
                    text:action.payload
                };
            }
            var newComments = state.commentsForSelectedChannel.slice();
            newComments.push(addedComment);
            return {
                ...state,
                commentsForSelectedChannel:newComments
            };
            return state;
        case constants.INCOMING_COMMENT:

            var payload = JSON.parse(action.payload.data);
            var channelName = payload.channelName;
            var commentText = payload.commentText;
            if (state.selectedChannel.name === channelName){
                if (state.commentsForSelectedChannel.length > 0){
                    addedComment = Object.assign({}, state.commentsForSelectedChannel[0]);
                    addedComment.text = commentText;
                }
                else {
                    addedComment = {
                        text:commentText
                    };
                }
                var newComments = state.commentsForSelectedChannel.slice();
                newComments.push(addedComment);
                return {
                    ...state,
                    commentsForSelectedChannel:newComments
                };

            } else {
                var updatedJoinedChannels = addRecievedCommentFromUser(state.joinedChannels, channelName, commentText);
                return {
                    ...state,
                    joinedChannels: updatedJoinedChannels,
                    selectedChannel: updatedJoinedChannels[0]
                };
            }
        default:
            return state
    }
}