import React from 'react';
import  { connect } from 'react-redux';
import {ping} from '../../actions';

function checkLogin() {
    console.log('checkLogin');
    const token = window.localStorage.getItem('rr_token');
    if (token !== '') {
        console.log('GO')
    }
    // if (login === 'admin') {
    //     console.log('пропусти')
    // }
}

let AppPP = ({ isPinging, ping }) => (
    <div>

        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={ping}>Start PING</button>
    </div>
);

function mapStateToProps(state) {
    const isPinging  = state.pingReducer.isPinging;
    // console.log('state.pingReducer', state.pingReducer);
    // console.log('isPinging', isPinging);
    return {
        isPinging
    }
}

AppPP = connect(
    //console.log('state', state);
    //({ isPinging }) => ({ isPinging }),
    mapStateToProps,
    { ping }
)(AppPP);


export default AppPP;
