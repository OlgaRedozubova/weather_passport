import { combineEpics } from 'redux-observable';
import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_SECRET} from "../constants/ActionTypes";
import { fetchUserFulfilled } from "../actions";
import { fetchSecretFulfilled } from "../actions";
import { authFailure } from "../actions";


const pingEpic = action$ =>
    action$.ofType('PING')
        .delay(1000) // Asynchronously wait 1000ms then continue
        .mapTo({ type: 'PONG' });


const counterEpic = action$ =>
    action$.ofType('INCREMENT_COUNTER')
        .delay(1000)
        .mapTo({type: 'DECREMENT_COUNTER'});

const authEpic = action$ =>
    action$.ofType(AUTH_SUCCESS) //позже подключить очищение token
    //action$.ofType(AUTH_TOKEN)
        .delay(1000)
        .mapTo({type: AUTH_FAILURE});


const fetchUserEpic = action$ =>
    action$.ofType(AUTH_REQUEST)
        .mergeMap(action =>
                submitToServer(action.payload, action.password)
                .then( response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        return ''
                    }
                })
                .then((response) => {
                        return response.token}
                )
                .catch(err => console.log('err', err))
        )
        .map(response => fetchUserFulfilled(response));

async function submitToServer(username, password) {
    try {
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password
            }),
        });
        return await response;
    } catch(error) {
        return error;
    }
}


const fetchSecterEpic = action$ =>
    action$.ofType(AUTH_SECRET)
        .mergeMap(action =>
            getSecretToServer(action.payload)
                .then(response => {
                    return response.name
                })
                .catch(err => console.log('err', err))
        )
        .map(response => fetchSecretFulfilled(response)
        );


async function getSecretToServer(token) {
    console.log('getSecrettoServer', token);
    try {
        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
                "Authorization": "JWT " + token
            }
        });
        const body = await response.json();
        return body;
    } catch(error) {
        return error;
    }
}

export default combineEpics(
    pingEpic,
    counterEpic,
    authEpic,
    fetchUserEpic,
    fetchSecterEpic

)