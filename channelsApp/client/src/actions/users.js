import axios from 'axios';
import actionTypes from '../constants/actionTypes';
const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8000/v1' : '/api';


export function signUpUser(formValues) {
    const request = axios.post(`${ROOT_URL}/user`, formValues);

    return {
        type: actionTypes.SIGNUP_USER,
        payload: request
    };
}

export function loginUserSuccess(user) {
    return {
        type: actionTypes.LOGIN_USER_SUCCESS,
        payload: user
    };
}

export function loginUserFailure(error) {
    return {
        type: actionTypes.LOGIN_USER_FAILURE,
        payload: error
    };
}


export function loginUser(username, password) {

    return dispatch => {
        return fetch(`${ROOT_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username, password}),
            mode: 'cors'
        })
            .then((response) => {
                console.log("Login Response is")
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    dispatch(loginUserSuccess(response))

                }
            })
            .catch((e) => console.log(e));
    }
}

