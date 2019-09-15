import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import history from '../history';
const ROOT_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8000/v1' : '/api';


export function signUpUser(formValues) {
    const request = axios.post(`${ROOT_URL}/user`, formValues);

    return {
        type: actionTypes.SIGNUP_USER,
        payload: request
    };
}

export function loginUserSuccess(user) {
    return (dispatch) => {
        dispatch ({
            type: actionTypes.LOGIN_USER_SUCCESS,
            payload: user
        });
        history.push('/home');
    }
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
            .then((response) => response.json()).then(data => {
                console.log(data);
                if (data.auth === true) {
                    dispatch(loginUserSuccess(data.user))
                } else {
                    throw Error(data.statusText);
                }
            })
            .catch((e) => console.log(e));
    }
}

