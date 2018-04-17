import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_TOKEN, AUTH_SECRET} from "../constants/ActionTypes";

export const ping = () => ({type: 'PING'});

// export const authRequest = (token) => (
//     {
//         type: AUTH_REQUEST,
//         payload: { token }
//     }
// );
//
// export const authSuccess = (user) => (
//     {
//         type: AUTH_SUCCESS,
//         payload: { user }
//     }
// );
//
// export const authFailure = () => ({
//     type: AUTH_FAILURE
// });

export const auth = (username) =>(
    {
        type: AUTH_SUCCESS,
        payload: username,
        mess: 'OK'
    }
    );

//action creator
export const fetchUser = username => (
    {
        type: AUTH_REQUEST,
        payload: username,
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

// export const auth = (username) => {
//     console.log('username', username);
//     dispatch(
//         {
//             type: AUTH_SUCCESS,
//             payload: username,
//             mass: 'S'
//         }
//     )
// };

export const counter = () => ({type: 'INCREMENT_COUNTER'});

