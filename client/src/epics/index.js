import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_TOKEN, AUTH_SECRET} from "../constants/ActionTypes";
import { fetchUserFulfilled } from "../actions";


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
                submitToServer(action.payload)
                .then(response => {return response.token})
                .catch(err => console.log('err', err))
        ).map(response => fetchUserFulfilled(response));


const fetchSecterEpic = action$ =>
    action$.ofType(AUTH_SECRET)
        .mergeMap(action =>
            getSecretToServer(action.payload)
                .then(response => {
                    console.log('SecretEpic', response);
                    return response
                })
                .catch(err => console.log('err', err))
        )
        .map(response => console.log('end', response));
        // .delay(1000)
        // .mapTo({type: 'AUTH_FAILURE'});

        // .mergeMap(action =>
        //     submitToServer(action.payload)
        //         .then(response => {return response.token})
        //         .catch(err => console.log('err', err))
        // ).map(response => fetchUserFulfilled(response));



async function getSecretToServer(token) {
    console.log('getSecrettoServer', token);
    try {
        var url = "/api/user";
        var xhr = new XMLHttpRequest();
        var res = {};

        xhr.open('GET', url, true);
        xhr.setRequestHeader("Authorization", "JWT " + token);
        xhr.addEventListener('load', function () {
            console.log('this.response', this.response);

            var responseObject = JSON.parse(this.response);
            res = responseObject;
            console.log('responseObject', responseObject);
            console.log('this.responseText', this.responseText);


            });
        xhr.send(null);
        return  await res;

    } catch (error) {
        return error;
    }
}




async function submitToServer(data) {
    try {
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: data,
                password: 'test'
            }),
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