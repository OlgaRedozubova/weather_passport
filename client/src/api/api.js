export function auth(username, password) {
    return function thunk(dispatch, getState) {
        dispatch({ type: 'AUTH_REQUEST' })
        return $.post('/login', { username, password })
            .then(() => dispatch({ type: 'AUTH_SUCCESS' }))
            .catch(() => dispatch({ type: 'AUTH_FAILURE' }))
    }
}