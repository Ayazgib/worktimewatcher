import {CHANGE_ACTIVITY} from "./types";

const initialState = {
    hours: 0,
    minuts: 0,
    seconds: 0,
    currentActivity: 'work',
}

export const TimerReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ACTIVITY:
            return {...state, currentActivity: action.payload}
        default: return state
    }
}