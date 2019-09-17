import constants from '../constants/actionTypes'

var initialState = {
    loggedInUser: null,
    isUserLoggedIn: false,
    showSignUpPage: false
};

export default (state = initialState, action) => {

    switch(action.type) {
        case constants.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                showSignUpPage: false
            };
        case constants.SIGNUP_USER_SHOW_DIALOG:
            return {
                ...state,
                showSignUpPage: true
            };

        case constants.SIGNUP_USER_HIDE_DIALOG:
            return {
                ...state,
                showSignUpPage: false
            };
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