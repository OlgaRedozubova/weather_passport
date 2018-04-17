//epics - Это функция, которая принимает поток действий и возвращает поток действий.

import { auth, loadUser, loadSite, loadPages } from 'auth';
import { openWebsockets } from 'my-websockets';
import { ajax } from 'rxjs/observable/dom/ajax';

//const { ajax } = Rx.Observable;

//слушает действие и возвращает token
export const loadUserOnAuth = (action$) =>
    action$
        .ofType('AUTH_SUCCESS')
        .mapTo((action) => loadUser(action.token));

export const openWebsocketsOnAuth = (action$) =>
    action$
        .ofType('AUTH_SUCCESS')
        .mapTo((action) => openWebsockets(action.token));

export const loadSiteAndPagesOnAuth = (action$) =>
    action$
        .ofType('AUTH_SUCCESS')
        .mergeMap((action) => (
            loadSite(action.token)
                .then((site) => loadPages(site, token);
))


const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
// action creators
const fetchUser = username => ({ type: FETCH_USER, payload: username });

const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });

// epic
const fetchUserEpic = action$ =>
    action$.ofType(FETCH_USER)
        .mergeMap(action =>
            ajax.getJSON(`https://api.github.com/users/${action.payload}`)
                .map(response => fetchUserFulfilled(response))
        );

const users = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_FULFILLED:
            return {
                ...state,
                // `login` is the username
                [action.payload.login]: action.payload
            };

        default:
            return state;
    }
};

// later...
dispatch(fetchUser('torvalds'));

