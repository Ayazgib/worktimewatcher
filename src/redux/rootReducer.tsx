import {combineReducers} from "redux";
import {TimerReducer} from "./TimerReducer";
import {GlobalReducer} from "./GlobalReducer";

export const rootReducer = combineReducers({
    timer: TimerReducer,
    global: GlobalReducer,
})