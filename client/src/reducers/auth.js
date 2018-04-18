import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_TOKEN, AUTH_SECRET, AUTH_SECRET_OK} from "../constants/ActionTypes";

const INITIAL_STATE = {
    mess: 'init',
    username: '',
    password: '',
    token: '',
    isLogin: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            //return action.payload.token;
            return {
                mess: 'OK',
                payload: action.payload,
                username: action.username,
                password: action.password,
                isLogin: false
            };
        case AUTH_SUCCESS:
            //return action.payload;
            return {
                mess: 'OK',
                payload: action.payload,
                isLogin: false
            }
            //return {mass: 'OK'};
        case AUTH_TOKEN:
            return {
              mess: 'Token',
                payload: action.payload,
              token: action.payload,
                isLogin: false
              //payload: action.payload
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
//                isLogin: action.isLogin,
                username: action.username,
                payload: action.payload
            };
        case  AUTH_FAILURE:
            return {
                mess: 'Доступ запрещен!',
                isLogin: false,
                payload: action.payload
            };
            //return state;//action.message;
        default:
            return state;
    }
};