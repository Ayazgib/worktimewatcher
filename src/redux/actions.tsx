import {
    CHANGE_ACTIVITY,
    CHANGE_CLOCK_STATUS,
    INCREMENT_TIMER_ITEM, SET_DATA_FROM_LS,
    SET_DURATION_HHMMSS,
    SET_IS_WARNING, SET_SHOULD_OPEN_MODAL, SET_START_TIME, TOGGLE_MODAL,
} from "./types";
import {Time} from "../common/models";

export function changeActivity(newActivity: string) {
    return {
        type: CHANGE_ACTIVITY,
        payload: newActivity
    }
}

export function changeClockStatus(status: number, isStart: boolean, shouldOpenModal: boolean = true) {
    return {
        type: CHANGE_CLOCK_STATUS,
        payload: {
            status, isStart, shouldOpenModal
        }
    }
}

export function changeTimer(time: Time) {
    return {
        type: INCREMENT_TIMER_ITEM,
        payload: {...time}
    }
}

export function toggleModal(modalStatus: boolean) {
    return {
        type: TOGGLE_MODAL,
        payload: modalStatus
    }
}

export function setDurationHHMMSS(time: string) {
    return {
        type: SET_DURATION_HHMMSS,
        payload: time
    }
}

export function setIsWarning(isWarning: boolean, warningTarget: any) {
    return {
        type: SET_IS_WARNING,
        payload: {isWarning, warningTarget}
    }
}

export function setStartTime(startTime: string) {
    return {
        type: SET_START_TIME,
        payload: startTime
    }
}

export function setDataFromLS(data: any) {
    return {
        type: SET_DATA_FROM_LS,
        payload: data
    }
}

export function setShouldOpenModal(should: boolean) {
    return {
        type: SET_SHOULD_OPEN_MODAL,
        payload: should
    }
}
