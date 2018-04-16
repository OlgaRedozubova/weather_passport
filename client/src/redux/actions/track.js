import * as actionTypes from '../../constants/ActionTypes';

export function setTracks(tracks) {
    return {
        type: actionTypes.TRACKS_SET,
        tracks
    };
};