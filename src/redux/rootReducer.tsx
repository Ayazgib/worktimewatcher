import {combineReducers} from "redux";
import {TimerReducer} from "./TimerReducer";
import {GlobalReducer} from "./GlobalReducer";
import {SettingsReducer} from "./SettingsReducer";

export const rootReducer = combineReducers({
    timer: TimerReducer,
    global: GlobalReducer,
    settings: SettingsReducer
})