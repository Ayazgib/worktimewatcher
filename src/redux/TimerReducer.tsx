import {
    CHANGE_ACTIVITY,
    CHANGE_CLOCK_STATUS,
    INCREMENT_TIMER_ITEM, SET_DATA_FROM_LS,
    SET_DURATION_HHMMSS, SET_IS_WARNING, SET_START_TIME,
    TOGGLE_MODAL
} from "./types";
import {clockStatus} from "../common/models";

const initialState = {
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    startTime: '',
    isStartTimer: false,
    shouldOpenModal: true,
    isOpenModal: false,
    isWarning: false,
    warningTarget: null,
    clockCurrentStatus: clockStatus.notStarted,
    currentActivity: 'work',
    durationHHMMSS: '00:00:00',
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
        case SET_IS_WARNING:
            return {...state, isWarning: action.payload.isWarning, warningTarget:  action.payload.warningTarget}
        default: return state
    }
}