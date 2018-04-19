import {combineReducers} from "redux";
import {authReducer} from "./auth.js";
import {pingReducer} from "./pingpong.js";

export default combineReducers({
    authReducer,
    pingReducer
});