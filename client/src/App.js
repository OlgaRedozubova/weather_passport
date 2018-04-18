import React, { Component } from 'react';
import {BrowserRouter as Router, Route,  Redirect} from 'react-router-dom';
//import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './assets/style/App.css';

import Header from './components/Header';

import Home from './containers/Home';
import Login from './components/Login';
import AppPP from './components/AppPP';


class App extends Component {
    render() {
        const loggedIn=window.localStorage.getItem('rr_token');
        console.log('loggedIn',loggedIn);
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    {/*<Route path="/appPP" component={AppPP}  onEnter={()=> {console.log('Go')}} />*/}
                    <Route path="/appPP" render ={() => (
                        window.localStorage.getItem('rr_token') ? (
                            <AppPP/>
                        ) : (
                            <Redirect to="/login"/>

                        )
                    )} />
                </div>
            </Router>
        );
    }
}

export default App;

