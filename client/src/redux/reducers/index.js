//reducers Редьюсеры должны быть чистыми функциями!
import { FETCH_USER_SUCCESS, FETCH_USER_FAILED } from '../../constants/ActionTypes';

import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_TOKEN } from '../../constants/ActionTypes';

import { combineReducers } from 'redux';

import track from './track';

const INITIAL_STATE = {};

// export const user = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case FETCH_USER_SUCCESS:
//             return action.payload.user
//         case FETCH_USER_FAILED:
//             return {};
//         default:
//             return state;
//     }
// };


export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return action.payload.token;
        case AUTH_SUCCESS:
            return action.payload.user;
        case  AUTH_FAILURE:
            return state;//action.message;
        default:
            return state;
    }
}

const INITIAL_STATE_C = {value1: 0};

export const counterReducer = (state = INITIAL_STATE_C, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            console.log('INCREMENT_COUNTER', action);
          //  state.value1 = action.value1;
          //  console.log('state.value1', state.value1);
           // return action.value1;
            //action.value += 1;
            return Object.assign ({}, {
                value1: action.value1 + 1
            });

        case 'DECREMENT_COUNTER' :
            return Object.assign ({}, {
            value1: state.value1 - 1
        });
        default:
            return state;
    }
}


//export default counterReducer;
export default combineReducers({
    //user,
    track,
    authReducer,
    counterReducer
});
