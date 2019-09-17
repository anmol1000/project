import actionTypes from '../constants/actionTypes';
import {emit} from "./websockets"
const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8000/v1' : '/api';

export function fetchJoinedChannelsSuccess(channelsList) {
    return {
        type: actionTypes.GET_USER_JOINED_CHANNELS_SUCCESS,
        payload: channelsList
    };
}
export function fetchUnJoinedChannelsSuccess(channelsList) {
    return {
        type: actionTypes.SHOW_JOIN_CHANNELS_DIALOG,
        payload: channelsList
    }
}

export function fetchAddChannelSuccess(channel){
    return {
        type:actionTypes.ADD_CHANNEL_DIALOG_SUCCESS,
        payload: channel
    }

}
export function fetchCommentsSuccess(commentsList) {
    return {
        type: actionTypes.GET_COMMENTS_SUCCESS,
        payload: commentsList
    };
}

export function fetchJoinedChannels(user) {
    var userName = user.username;
    return dispatch => {
        return fetch(`${ROOT_URL}/channel/user/${userName}`, {
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

export function fetchUnjoinedChannels(user) {
    var userName = user.username;
    return dispatch => {
        return fetch(`${ROOT_URL}/channel/notUser/${userName}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((response) => response.json()).then(data => {
                if (data.channels) {
                    dispatch(fetchUnJoinedChannelsSuccess(data.channels))
                } else {
                    throw Error(data.statusText);
                }
            })
            .catch((e) => console.log(e));
    }
}

export function fetchAddChannel(user, channelName) {
    var userName = user.username;
    return dispatch => {
        return fetch(`${ROOT_URL}/channel/userChannel`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName, channelName}),
            mode: 'cors'
        })
            .then((response) => response.json()).then(data => {
                dispatch(fetchAddChannelSuccess(data.channel))
            })
            .catch((e) => console.log(e));
    }
}

export function postJoinChannel({userName, channelName}) {
    return dispatch => {
        return fetch(`${ROOT_URL}/channel/join`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName, channelName}),
            mode: 'cors'
        })
            .then((response) => response.json()).then(data => {
                dispatch({
                    type:actionTypes.USER_JOINED_CHANNEL_SUCCESS,
                    payload:data.channel
                })
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
