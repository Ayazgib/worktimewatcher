import {combineReducers} from "redux";
import {TimerReducer} from "./TimerReducer";

export const rootReducer = combineReducers({
    timer: TimerReducer
})