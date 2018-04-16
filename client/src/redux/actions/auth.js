import * as actionTypes from '../../constants/ActionTypes';
import { Observable } from 'rxjs';

// export function auth() {
//     return {
//         type: actionTypes.AUTH
//     };
// }
//
// export const authEpic = (action$) =>
//     action$
//         .ofType(actionTypes.AUTH)
//         .mergeMap(() =>
//             Observable.from(SC.connect())
//                 .map(setSession)
//                 .catch(setSessionError)
//         );


export function auth(username, password) {
    return function thunk(dispatch, getState) {
        dispatch({ type: 'AUTH_REQUEST' })
        return $.post('/login', { username, password })
            .then(() => dispatch({ type: 'AUTH_SUCCESS' }))
            .catch(() => dispatch({ type: 'AUTH_FAILURE' }))
    }
}

function loadUser() {
    return (dispatch) => {
        fetch('/api/token')
            .then(response => {
                if (!response.ok) {
                    // dispatching a downstream action
                    return dispatch(requestFailedAction());
                }
                return response.json();
            })
            .then(data => dispatch(requestSuccessAction(data)))
            .catch(err => dispatch(requestFailedAction())
    }
}