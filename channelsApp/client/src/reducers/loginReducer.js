import constants from '../constants/actionTypes'

var initialState = {
    userLoggedIn: false
};

export default (state = initialState, action) => {

    switch(action.type) {

        case constants.LOGIN_USER_SUCCESS:
            return {
                ...state,
                userLoggedIn: true
            };

        case  constants.LOGIN_USER_FAILURE:
            return {
                ...state,
                userLoggedIn: false
            };

        default:
            return state
    }
}