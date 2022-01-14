import {CHANGE_ACTIVITY} from "./types";

export function changeActivity(newActivity: string) {
    return {
        type: CHANGE_ACTIVITY,
        payload: newActivity
    }
}