import actionTypes from '../constants/actionTypes.js';
import WEBSOCKET_URI from '../constants/projectConstants';
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8000');

export const init = () => {
    ws.onopen = function(){

    }
};

export const emit = (payload) => ws.send( payload );