import {IactionsWithMusic} from "./models";

export const togglePlayingMusic = (actionName: string, actionMusicListItem: IactionsWithMusic[]) => {
    let currentAction = actionMusicListItem.find((action: IactionsWithMusic) => action.actionName === actionName);
    if (currentAction) {
        let music = new Audio(currentAction.musicUrl);
        music.play();
        setTimeout(() => {
            music.pause();
        } , 3000)
    }

}