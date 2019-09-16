import actionTypes from '../constants/actionTypes.js';
const WebSocket = require('ws');
let ws;

export const init = (dispatch,userId) => {
    ws = new WebSocket('ws://localhost:8000/?userName=' + userId);
    ws.onopen = function () {
        console.log("The connection has been opened");
    };
    ws.onmessage = function incoming(data) {
        console.log("Data recieved is", data);
        dispatch({type: actionTypes.INCOMING_COMMENT, data});
    };
};

export const emit = (payload) => ws.send( payload );