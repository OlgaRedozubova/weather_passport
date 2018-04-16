import * as actionTypes from '../../constants/ActionTypes';
import { Observable } from 'rxjs';

export function auth() {
    return {
        type: actionTypes.AUTH
    };
}

export const authEpic = (action$) =>
    action$
        .ofType(actionTypes.AUTH)
        .mergeMap(() =>
            Observable.from(SC.connect())
                .map(setSession)
                .catch(setSessionError)
        );