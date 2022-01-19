import {
    CHANGE_ACTIVITY,
    CHANGE_CLOCK_STATUS,
    INCREMENT_TIMER_ITEM, POMODORRO_PLAYING_COUNT, SET_DATA_FROM_LS,
    SET_DURATION_HHMMSS, SET_IS_WARNING, SET_START_TIME, TOGGLE_FROM_POMODORRO,
    TOGGLE_MODAL
} from "./types";
import {clockStatus} from "../common/models";

const initialState = {
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    savedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    isPomodorroTimer: false,
    startTime: '',
    isStartTimer: false,
    shouldOpenModal: true,
    isOpenModal: false,
    isWarning: false,
    warningTarget: null,
    clockCurrentStatus: clockStatus.notStarted,
    currentActivity: 'work',
    durationHHMMSS: '00:00:00',
    pomodorroCount: 0,
}

export const TimerReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ACTIVITY:
            return {...state, currentActivity: action.payload};
        case CHANGE_CLOCK_STATUS:
            return {...state, clockCurrentStatus: action.payload.status, isStartTimer: action.payload.isStart, shouldOpenModal: action.payload.shouldOpenModal}
        case INCREMENT_TIMER_ITEM:
            return {...state, time: action.payload}
        case TOGGLE_MODAL:
            return {...state, isOpenModal: action.payload}
        case SET_DURATION_HHMMSS:
            return {...state, durationHHMMSS: action.payload}
        case SET_START_TIME:
            return {...state, startTime: action.payload}
        case TOGGLE_FROM_POMODORRO:
            return {...state, savedTime:  action.payload.time, isPomodorroTimer: action.payload.isPomodorroTimer}
        case POMODORRO_PLAYING_COUNT:
            return  {...state, pomodorroCount: action.payload}
        default: return state
    }
}