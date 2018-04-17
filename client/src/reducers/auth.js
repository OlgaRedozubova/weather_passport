import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS} from "../constants/ActionTypes";

const INITIAL_STATE = {};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            //return action.payload.token;
            return {mass: 'OK'};
        case AUTH_SUCCESS:
            //return action.payload;
            return {
                mass: 'OK',
                payload: action.payload
            }
            //return {mass: 'OK'};
        case  AUTH_FAILURE:
            return {
                mass: 'No',
                payload: ''
            };
            //return state;//action.message;
        default:
            return state;
    }
};