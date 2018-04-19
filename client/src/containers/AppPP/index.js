import React from 'react';
import  { connect } from 'react-redux';
import { ping } from '../../actions/index';

let AppPP = ({ isPinging, ping }) => (
    <div className="container">
        <h1>It's secret page!!!</h1>
        <h2>is pinging: <strong>{isPinging.toString()}</strong></h2>
        <button onClick={ping}>Start PING</button>
    </div>
);

function mapStateToProps(state) {
    const isPinging  = state.pingReducer.isPinging;
    return {
        isPinging
    }
}

AppPP = connect(
    mapStateToProps,
    { ping }
)(AppPP);


export default AppPP;
