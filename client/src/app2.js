import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import './assets/style/App.css';

import Header from './components/Header';
import Home from './containers/Home';
import Time from './containers/Time/index';
import Login from './components/Login';
// import Towns from './containers/Towns';

class App extends Component {
// make the request to the login endpoint
    getToken() {
        var loginUrl = "http://localhost:3000/login"
        var xhr = new XMLHttpRequest();
        var userElement = document.getElementById('username');
        var passwordElement = document.getElementById('password');
        var tokenElement = document.getElementById('token');
        var user = userElement.value;
        var password = passwordElement.value;

        xhr.open('POST', loginUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.addEventListener('load', function() {
            var responseObject = JSON.parse(this.response);
            console.log(responseObject);
            if (responseObject.token) {
                tokenElement.innerHTML = responseObject.token;
            } else {
                tokenElement.innerHTML = "No token received";
            }
        });

        var sendObject = JSON.stringify({name: user, password: password});

        console.log('going to send', sendObject);

        xhr.send(sendObject);
    }

// make the request to the secret API endpoint
    getSecret() {

        var url = "http://localhost:3000/secret"
        var xhr = new XMLHttpRequest();
        var tokenElement = document.getElementById('token');
        var resultElement = document.getElementById('result');
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Authorization", "JWT " + tokenElement.innerHTML);
        xhr.addEventListener('load', function() {
            var responseObject = JSON.parse(this.response);
            console.log(responseObject);
            resultElement.innerHTML = this.responseText;
        });

        xhr.send(null);
    }


    render() {
        return (
            <div>
                <div className="input">
                    <label htmlFor="username">user name:</label>
                    <input id="username">
                        <label htmlFor="password">password:</label>
                        <input id="password">
                            <button onClick={this.getToken.bind}>login</button>
                </div>
                <div id="token"></div>
                <button onClick={this.getSecret.bind}>get secret message</button>
                <div id="result"></div>
                <script src="jwt-vanilla.js"></script>
            </div>
    );
    }
    }

    export default App;