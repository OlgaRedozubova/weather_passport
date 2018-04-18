import  React from 'react';
import Menu from '../Menu';

//import logo from '../../assets/images/logo.svg';

export default () => {
    function getSingIn() {

    }
    return(
        <header >
            {/*<img src={logo} className="App-logo" alt="logo" />*/}

            <div className="top">
                <button onClick={getSingIn}>Sing In</button>
                <button>Sing Out</button>
            </div>

            <div className="App-header">
                <h1 className="App-title">Weather in the town</h1>
                <a href="/appPP">App</a>
                <Menu/>
            </div>
        </header>
    )
}