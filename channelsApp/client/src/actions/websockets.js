import io from 'socket.io-client';
import actionTypes from '../constants/actionTypes.js';
import WEBSOCKET_URI from '../constants/projectConstants';
let socket;
export const init = () => {
    var connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
        "timeout" : 10000, //before connect_error and connect_timeout are emitted.
        "transports" : ["websocket"]
    };
    socket = io.connect("http://localhost:8000");
    // export const init = ( store ) => {
//     Object.keys( actionTypes )
//         .forEach( type => socket.on( type, ( payload ) =>
//                 store.dispatch({ type, payload })
//             )
//         );
// };
};

export const emit = (payload) => socket.emit( 'First_Event', payload );