import {
    POMODORRO_TIME,
    TOGGLE_POMODORRO,
} from "./types";

const initialState = {
    pomodorroIsActive: false,
    pomodorroTime: {work: 20, chill: 5},
}

export const SettingsReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_POMODORRO:
            return {...state, pomodorroIsActive: action.payload};
        case POMODORRO_TIME:
            return {...state, pomodorroTime: {work: action.payload.work, chill: action.payload.chill}};
        default: return state
    }
}