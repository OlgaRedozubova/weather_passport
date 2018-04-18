import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_TOKEN, AUTH_SECRET, AUTH_SECRET_OK} from "../constants/ActionTypes";

export const ping = () => ({type: 'PING'});

export const auth = (username) =>(
    {
        type: AUTH_SUCCESS,
        payload: username,
        mess: 'OK'
    }
    );

//action creator
export const authRequest = (username, password) => (
    {
        type: AUTH_REQUEST,
        payload: username,
        password: password,
        mess: 'OK'
    }
    );

export const fetchUserFulfilled = payload => (
    {
        type: AUTH_TOKEN,
        payload
    }
    );

export const fetchSecret = token => (
    {
        type: AUTH_SECRET,
        payload: token,
        mess: 'OK'
    }
);

export const fetchSecretFulfilled = payload => (
    {
        type: AUTH_SECRET_OK,
        payload
    }
);


export const authFailure = payload => (
    {
        type: AUTH_FAILURE,
        mess: 'No'
    }
);

export const counter = () => ({type: 'INCREMENT_COUNTER'});

