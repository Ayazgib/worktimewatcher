import {CHANGE_ACTIVITY, CHANGE_CLOCK_STATUS, INCREMENT_TIMER_ITEM} from "./types";
import {clockStatus} from "../common/models";

const initialState = {
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    clockCurrentStatus: clockStatus.notStarted,
    currentActivity: 'work',
}

export const TimerReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ACTIVITY:
            return {...state, currentActivity: action.payload};
        case CHANGE_CLOCK_STATUS:
            return {...state, clockCurrentStatus: action.payload}
        case INCREMENT_TIMER_ITEM:
            return {...state, time: action.payload}
        default: return state
    }
}