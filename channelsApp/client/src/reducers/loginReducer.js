import constants from '../constants/actionTypes'

var initialState = {
    loggedInUser: null,
    isUserLoggedIn: false
};

export default (state = initialState, action) => {

    switch(action.type) {

        case constants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isUserLoggedIn: true,
                loggedInUser: action.payload
            };

        case  constants.LOGIN_USER_FAILURE:
            return {
                ...state,
                isUserLoggedIn: false
            };

        default:
            return state
    }
}