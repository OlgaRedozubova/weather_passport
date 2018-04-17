import React, { Component } from 'react';
import { connect } from 'react-redux';
import {counter} from '../../actions';
import {auth} from '../../actions';


// let Login =({ mass, auth}) => (
//     <div>
//         <h1>mass = {mass}</h1>
//         <button onClick={auth}>Start PING</button>
//     </div>
// );
//
//
// function mapStateToProps (state) {
//     const mass = state.authReducer.mass;
//     console.log('mapStateToProps mass = ', state);
//     console.log('mass', mass);
//     return {
//         mass
//     }
// };
//
// Login = connect(
//     mapStateToProps,
//     { auth }
// )(Login);
//
// export default Login;

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: ''
        }
    }

    onAddTodo = () => {
//        this.props.auth('Nik');// onAddTodo('Nik') ;
        this.props.onAddTodo('Nik') ;
    };

    render() {
        console.log('props', this.props);
        return(
            <div>
                <h1>mass {this.props.mass} = {this.props.payload}</h1>
                <button onClick={() =>this.props.onAddTodo('Nik')}>Start PING</button>
                {/*<button onClick={this.onAddTodo}>Start PING</button>*/}
            </div>
        )
    }

}

function mapStateToProps (state) {
    const mass = state.authReducer.mass;
    console.log('mapStateToProps mass = ', state);
    console.log('mass', mass);
    console.log('payload', state.authReducer.payload);
    return {
        mass: mass,
        payload: state.authReducer.payload
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        onAddTodo: (value) => {
            console.log('value', value);
            dispatch(auth(value)
            //{
                // type: 'AUTH_SUCCESS',
                // payload: value,
                // mass: 'S'
            //}
              )
        }
        //deleteContact: index => dispatch(contactAction.deleteContact(index))
    }
}

Login = connect(
    mapStateToProps,
    mapDispatchToProps
    //{ auth }
)(Login);

export default Login;
//export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default connect(mapStateToProps, { counter })(Login);