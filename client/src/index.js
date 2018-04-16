import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators/map'

import cofigureStore from './redux/Store/configureStore';

import * as actions from './redux/actions/track';

const tracks = [
    {
        title: 'Some track'
    },
    {
        title: 'Some other track'
    }
];


const store = cofigureStore();
store.dispatch(actions.setTracks(tracks));


//
// function getState$(store) {
//     return new Observable(function (observer) {
//         observer.next (store.getState());
//
//         const unsubscribe = store.subscribe(function () {
//             observer.next(store.getState());
//             //observer.next(console.log('next'));
//         });
//         return unsubscribe;
//     });
// }

// const state$ = getState$(store);
const state$ = from(store);
console.log('state$', state$);
const counter$ = state$.pipe(
    map(state => state.value)
);

console.log('counter$', counter$);

const subscription = state$.subscribe(function (state) {
    console.log(state);
});

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

 registerServiceWorker();
