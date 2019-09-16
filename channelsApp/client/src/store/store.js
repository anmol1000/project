import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from '../reducers/loginReducer';
import channelReducer from "../reducers/channelReducer";
import { init } from "../actions/websockets";


function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log('state after dispatch', getState());

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

const store = createStore(
    combineReducers({
        login: loginReducer,
        channel: channelReducer
    }),
    applyMiddleware(
        thunk
    )
);
init();
// init(store);

export default store;