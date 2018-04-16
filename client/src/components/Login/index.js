import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as action from '../../redux/actions/actions';
import * as types from '../../constants/ActionTypes';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
                user: '',
                password: '',
                token: '',
                value1: 1
        };
    }

        // state = {
        //     user: '',
        //     password: '',
        //     token: ''
        // };

    Auth = async () => {
        const  response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.UserInput.value,
                password: this.PasswordInput.value
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getSecret() {

        var url = "/api/user"
        var xhr = new XMLHttpRequest();
        var tokenElement = document.getElementById('token');
        var resultElement = document.getElementById('result');
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Authorization", "JWT " + tokenElement.innerHTML);
        xhr.addEventListener('load', function() {
            console.log(this.response);

            var responseObject = JSON.parse(this.response);
            console.log(responseObject);
            resultElement.innerHTML = this.responseText;
        });

        xhr.send(null);
    }

    login(e) {
        e.preventDefault();
        var tokenElement = document.getElementById('token');
        console.log(this.UserInput.value);
        console.log(this.PasswordInput.value);
        this.setState({
            user: this.UserInput.value,
            password: this.PasswordInput.value
        });
        this.Auth()
            .then(res => {
                console.log('OKres', res)
                if (res) {
                    tokenElement.innerHTML = res.token;
                    this.setState({token: res.token})
                }
            }

            )
            .catch(err => console.log('err'));
        // Here, we call an external AuthService. We’ll create it in the next step
        // Auth.login(this.state.user, this.state.password)
        //     .catch(function(err) {
        //         console.log('Error logging in', err);
        //     });
    }

    fetchSecret = async () => {
        const  response = await fetch('/api/secret', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":  "jwt " + this.state.token,
            },
            body: JSON.stringify({
                token: this.state.token
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    // getSecret = (e) => {
    //     e.preventDefault();
    //     const token = this.state.token;
    //     console.log('token', token);
    //     this.fetchSecret()
    //         .then(() => console.log('ok'))
    //         .catch(() => console.log('err'));
    //
    //     // var url = "/api/secret";
    //     // var xhr = new XMLHttpRequest();
    //     // var tokenElement = document.getElementById('token');
    //     // var resultElement = document.getElementById('result');
    //     //
    //     // xhr.open('GET', url, true);
    //     // xhr.setRequestHeader("Authorization", "jwt " + tokenElement.innerHTML);
    //     // xhr.addEventListener('load', function() {
    //     //     var responseObject = JSON.parse(this.response);
    //     //     console.log('responseObject', this.response);
    //     //     resultElement.innerHTML = this.responseText;
    //     // });
    //     //
    //     // xhr.send(null);
    //
    // };

    onAddTodoClick = () => {
        var value = this.state.value1;
        value += 1;
        this.props.onAddTodo(value);
        console.log('----1', this.props);
        // console.log('this.state.value',  this.state.value);
        // this.props.onAddTodo(this.state.value);
    }

    render() {
// make the request to the secret API endpoint
console.log('----', this.props);
        return (
            <div>
                <h2>Login in</h2>
                <form name='login'>
                    <div className='form-group'>
                        {/*//value={this.linkState('user')}*/}
                        <label>Username</label>
                        <input
                            className="form-control input-lg"
                            type='text'
                            ref={(input) => {this.UserInput = input}}
                            id='login'
                            placeholder='Username' />
                        {/*value={this.linkState('password')}*/}
                        <label>Password</label>
                        <input
                            className="form-control input-lg"
                            type='text'
                            ref={(input) => {this.PasswordInput = input}}
                            id='password'
                            placeholder='Password' />
                    </div>
                    <button className="btn btn-lg btn-success" type='submit' onClick={this.login.bind(this)}>Submit</button>
                    <div id="token"></div>
                    {/*<button className="btn btn-lg btn-success" onClick={this.getSecret}>Submit</button>*/}
                    {/*<div id="result"></div>*/}
                </form>

                <button onClick={this.getSecret.bind(this)}>get secret message</button>
                <div id="result"></div>
                <button onClick={this.onAddTodoClick}>Redux</button>*
            </div>
        );
    }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
//reactMixin(Login.prototype, React.addons.LinkedStateMixin);

//export default Login;

//как трансформировать текущее Redux-состояние хранилища в props
const mapStateToProps = (state) => {
    console.log('mapStateToProps', state.counterReducer.value1);
    return {
        value1: state.counterReducer.value1,
    }
};
//mapDispatchToProps(), которая получает метод dispatch() и возвращает колбек props, который вы можете вставить в представление
const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (value) => {
           // console.log('value', value);
            dispatch(action.addTodo(value)
                // {
                //     type: 'INCREMENT_COUNTER',
                //     value1: value
                // }
                )
        }
        //deleteContact: index => dispatch(contactAction.deleteContact(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);