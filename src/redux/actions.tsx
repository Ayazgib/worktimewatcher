import {CHANGE_ACTIVITY, CHANGE_CLOCK_STATUS, INCREMENT_TIMER_ITEM} from "./types";
import {Time} from "../common/models";

export function changeActivity(newActivity: string) {
    return {
        type: CHANGE_ACTIVITY,
        payload: newActivity
    }
}

export function changeClockStatus(status: number) {
    return {
        type: CHANGE_CLOCK_STATUS,
        payload: status
    }
}

export function changeTimer(time: Time) {
    return {
        type: INCREMENT_TIMER_ITEM,
        payload: {...time}
    }
}