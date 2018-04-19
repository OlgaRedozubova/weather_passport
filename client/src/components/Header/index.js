import  React from 'react';
import Menu from '../Menu';
import Auth from '../../components/Auth';

export default () => {
    return(
        <header >
            <Auth />
            <div className="App-header">
                <h1 className="App-title">Weather in the town</h1>
                <Menu/>
            </div>
        </header>
    )
}