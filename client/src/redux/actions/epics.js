import { auth, loadUser, loadSite, loadPages } from '../../api/api';
import { openWebsockets } from 'my-websockets';

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


export function auth(username, password) {
    return function thunk(dispatch, getState) {
        dispatch({ type: 'AUTH_REQUEST' })
        return $.post('/login', { username, password })
            .then(() => dispatch({ type: 'AUTH_SUCCESS' }))
            .catch(() => dispatch({ type: 'AUTH_FAILURE' }))
    }
}