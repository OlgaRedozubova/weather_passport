import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authRequest } from '../../actions';
import { authSecret } from '../../actions';
import { authFailure } from '../../actions';
import LoginForm from '../LoginForm';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            token: '',
            isLogin: false,
            auth: {}
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

    auth = (username, password) => {
        this.props.onAddTodo(username, password);
        //this.props.getSecret(this.props.token);
        //setTimeout(() => {this.props.getSecret(this.props.token)}, 100);
    };



    render() {
        //console.log('props', this.auth);
        return(
            <div className="login">
                <LoginForm login = {this.auth}/>
                <div>
                    <p>mes = {this.props.mess}</p>
                    <p>username = {this.props.username}</p>
                    <p>password = {this.props.password}</p>
                    <p>token = {this.props.token}</p>
                    <p>payload = {this.props.payload}</p>
                    <p>isLogin = {this.props.isLogin.toString()}</p>
                </div>
                <h1>mess {this.props.mess} = {this.props.token}</h1>
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
    const mess = state.authReducer.mess;
    console.log('mapStateToProps mess = ', state);
    console.log('mess', mess);
    console.log('payload', state.authReducer.payload);
    return {
        mess: mess,
        username: state.authReducer.username,
        payload: state.authReducer.payload,
        password: state.authReducer.password,
        token: state.authReducer.token,
        isLogin: state.authReducer.isLogin,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (username, password) => {
            //console.log('mapDispatchToProps', username, password);
            dispatch(authRequest(username, password))
        },
        getSecret: (token) => {
            console.log('token!!!', token);
            if (token){dispatch(authSecret(token))
            }else {
                dispatch(authFailure())
            }
        }
    }
};

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Login;
