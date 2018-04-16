//action(действие) - простой js-объект, который описываетчто случилось
//actions
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED } from '../../constants/ActionTypes';
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../../constants/ActionTypes';

//отправим это действие после изменения имени пользователя
export const fetchUser = username => ({
    type: FETCH_USER,
    payload: { username }
});
//отправит это действие с данными пользователя, еслт=и HTTP-запрос будет успешным
export const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: { user }
});
//отправит это действие с данными пользователя, еслт=и HTTP-запрос не прошел
export const fetchUserFailed = () => ({
    type: FETCH_USER_FAILED
});



export const authRequest = (token) => (
    {
        type: AUTH_REQUEST,
        payload: { token }
    }
);

export const authSuccess = (user) => (
    {
        type: AUTH_SUCCESS,
        payload: { user }
    }
);

export const authFailure = () => ({
    type: AUTH_FAILURE
});


export const addTodo = (value1) => (
    {type: 'INCREMENT_COUNTER',
    value1: value1}
);