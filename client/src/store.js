import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
//import { pingEpic} from "./epics";
//import pingReducer from './reducers/pingpong';

import rootReducer from './reducers/index';
import rootEpic from "./epics";

//const epicMiddleware = createEpicMiddleware(pingEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

export default createStore(
  //  pingReducer,
    rootReducer,
    applyMiddleware(epicMiddleware)
);