import { combineEpics } from 'redux-observable';
import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS} from "../constants/ActionTypes";


const pingEpic = action$ =>
    action$.ofType('PING')
        .delay(1000) // Asynchronously wait 1000ms then continue
        .mapTo({ type: 'PONG' });


const counterEpic = action$ =>
    action$.ofType('INCREMENT_COUNTER')
        .delay(1000)
        .mapTo({type: 'DECREMENT_COUNTER'});

const authEpic = action$ =>
    action$.ofType(AUTH_SUCCESS)
        .delay(1000)
        .mapTo({type: AUTH_FAILURE});

export default combineEpics(
    pingEpic,
    counterEpic,
    authEpic
)