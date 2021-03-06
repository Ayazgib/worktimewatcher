import {
    POMODORRO_TIME, REORDER_MUSIC, TOGGLE_MUSIC,
    TOGGLE_POMODORRO, TOGGLE_THEME,
} from "./types";

const initialState = {
    pomodorroIsActive: false,
    pomodorroTime: {work: 20, chill: 5},
    musicIsActive: false,
    musicActions: [],
    theme: 'light',
}


export const SettingsReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_POMODORRO:
            return {...state, pomodorroIsActive: action.payload};
        case POMODORRO_TIME:
            return {...state, pomodorroTime: {work: action.payload.work, chill: action.payload.chill}};
        case TOGGLE_MUSIC:
            return {...state, musicIsActive: action.payload};
        case REORDER_MUSIC:
            return {...state, musicActions: action.payload};
        case TOGGLE_THEME:
            return {...state, theme: action.payload};
        default: return state
    }
}