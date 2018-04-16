import * as actionTypes from '../../constants/ActionTypes';

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TRACKS_SET:
            return setTracks(state, action);
    }
    return state;
}

function setTracks(state, action) {
    const { tracks } = action;
    return [ ...state, ...tracks ];
}