import actionTypes from '../constants/actionTypes';
import {emit} from "./websockets"
const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8000/v1' : '/api';

export function fetchJoinedChannelsSuccess(channelsList) {
    return {
        type: actionTypes.GET_USER_JOINED_CHANNELS_SUCCESS,
        payload: channelsList
    };
}
export function fetchCommentsSuccess(commentsList) {
    return {
        type: actionTypes.GET_COMMENTS_SUCCESS,
        payload: commentsList
    };
}

export function fetchJoinedChannels(user) {
    return dispatch => {
        return fetch(`${ROOT_URL}/channel`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((response) => response.json()).then(data => {
                if (data.channels) {
                    dispatch(fetchJoinedChannelsSuccess(data.channels))
                } else {
                    throw Error(data.statusText);
                }
            })
            .catch((e) => console.log(e));
    }
}

export function channelSelectedOnClick(selectedChannel) {
    return dispatch => {
        dispatch({
            type: actionTypes.CHANNEL_SELECTED,
            payload: selectedChannel
        });
        dispatch(fetchCommentsForSelectedChannel(selectedChannel))
    }
}

export function fetchCommentsForSelectedChannel(selectedChannel) {
    var channelName = selectedChannel.name;
    return dispatch => {
        return fetch(`${ROOT_URL}/comment/${channelName}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((response) => response.json()).then(data => {
                if (data.comments) {
                    dispatch(fetchCommentsSuccess(data.comments))
                } else {
                    throw Error(data.statusText);
                }
            })
            .catch((e) => console.log(e));
    }
}

export function userCommented(commentText, selectedChannel, selectedUser) {
    var channelName = selectedChannel.name;
    var userName = selectedUser.username;
    return dispatch => {
        dispatch({
            type: actionTypes.USER_COMMENTED,
            payload: commentText
        });
        emit({
            type:"COMMENT_ADDED",
            channelName,
            userName,
            commentText
        });
    }

}
