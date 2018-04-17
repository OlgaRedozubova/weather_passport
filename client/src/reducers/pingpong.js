//const INITIAL_STATE = { isPinging: false };

export const pingReducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case 'PING':
            return { isPinging: true };

        case 'PONG':
            return { isPinging: false };

        default:
            return state;
    }
};

// export default (state = { isPinging: false }, action) => {
//     switch (action.type) {
//         case 'PING':
//             return { isPinging: true };
//
//         case 'PONG':
//             return { isPinging: false };
//
//         default:
//             return state;
//     }
// };