import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './assets/style/App.css';

import Header from './components/Header';

import Home from './containers/Home';
import Login from './components/Login';
import AppPP from './components/AppPP';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/appPP" component={AppPP} />
                </div>
            </Router>
        );
    }
}

export default App;

