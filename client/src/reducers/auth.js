import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_TOKEN, AUTH_SECRET, AUTH_SECRET_OK, AUTH_SINGOUT} from "../constants/ActionTypes";

const INITIAL_STATE = {
    mess: '',
    username: '',
    password: '',
    token: '',
    isLogin: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                mess: 'OK',
                payload: action.payload,
                username: action.username,
                password: action.password,
                isLogin: false
            };
        case AUTH_SUCCESS:
            return {
                mess: 'OK',
                payload: action.payload,
                isLogin: false
            }
        case AUTH_TOKEN:
            return {
              mess: 'Token',
              payload: action.payload,
              token: action.payload,
              username: action.username,
              isLogin: false
            };
        case AUTH_SECRET:
            return {
                mess: 'Secret',

                payload: action.payload,
                isLogin: false
            };
        case AUTH_SECRET_OK:
            return {
                mess: 'Доступ разрешен!',
                isLogin: true,

                username: action.username,
                payload: action.payload
            };
        case  AUTH_FAILURE:
            return {
                mess: 'Доступ запрещен!',
                isLogin: false,
                payload: action.payload
            };
        case AUTH_SINGOUT:
            return{
                mess: 'OUT',
                isLogin: false,
                payload: '',
                username: '',
                password: '',
                token: ''
            };

        default:
            return state;
    }
};