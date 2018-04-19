import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './assets/style/App.css';

import Home from './containers/Home';
import Login from './containers/Login';
import AppPP from './containers/AppPP';

import Header from './components/Header';
import { isLogin } from './components/Auth';



export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
               isLogin() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>

                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/appPP" component={AppPP} />
                </div>
            </Router>
        );
    }
}

export default App;

