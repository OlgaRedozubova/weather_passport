//export default counterReducer;
import {combineReducers} from "redux";
import {authReducer} from "./auth.js";
import {pingReducer} from "./pingpong.js";


export const counterReducer = (state = {value1: 2}, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return {value1: 100};
            // console.log('INCREMENT_COUNTER', action);
            // return Object.assign ({}, {
            //     value1: action.value1 + 1
            // });

        case 'DECREMENT_COUNTER' :
            return {value1: 55};
            // return Object.assign ({}, {
            //     value1: state.value1 - 1
            // });
        default:
            return state;
    }
}

export default combineReducers({
    authReducer,
    pingReducer,
    counterReducer
});