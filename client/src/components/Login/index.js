import React, { Component } from 'react';
import { connect } from 'react-redux';
import {counter} from '../../actions';
import {auth} from '../../actions';
import {fetchUser} from '../../actions';
import {fetchSecret} from '../../actions';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            token: '',
        }
    }

    onAddTodo = () => {
//        this.props.auth('Nik');// onAddTodo('Nik') ;
        this.props.onAddTodo('Nik') ;
    };

    login = (e) => {
        e.preventDefault();
        this.props.onAddTodo('test');
        //this.props.onAddTodo(this.UserInput.value) ; // + ввод с экрана + добавить проверку на корректность поля
    };

    getSecret = () => {
        console.log('token!=', this.props.payload);
        this.props.getSecret(this.props.payload);
    };

    render() {
        console.log('props', this.props);
        return(
            <div>
                <h1>mass {this.props.mass} = {this.props.payload}</h1>
                <button onClick={() =>this.props.onAddTodo('test')}>Start PING</button>
                {/*<button onClick={this.onAddTodo}>Start PING</button>*/}


                <h2>Login in</h2>
                <form name='login'>
                    <div className='form-group'>
                        <label>Username</label>
                        <input
                            className="form-control input-lg"
                            type='text'
                            ref={(input) => {this.UserInput = input}}
                            id='login'
                            placeholder='Username' />

                        <label>Password</label>
                        <input
                            className="form-control input-lg"
                            type='text'
                            ref={(input) => {this.PasswordInput = input}}
                            id='password'
                            placeholder='Password' />
                    </div>

                    <button className="btn btn-lg btn-success" type='submit' onClick={this.login}>Submit</button>
                    <div id="token">{this.props.payload}</div>
                    {/*<button className="btn btn-lg btn-success" onClick={this.getSecret}>Submit</button>*/}
                    {/*<div id="result"></div>*/}
                </form>

                <button onClick={this.getSecret}>get secret message</button>
                <div id="result"></div>

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

            dispatch(
                fetchUser(value)
                //auth(value)
            //{
                // type: 'AUTH_SUCCESS',
                // payload: value,
                // mass: 'S'
            //}
              )
        },
        getSecret: (value) => { dispatch(fetchSecret(value))
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