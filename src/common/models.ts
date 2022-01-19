import exp from "constants";
export const savedConstName = 'app_data';

export enum clockStatus {
    notStarted= 'notStarted',
    stop='stop',
    start='start',
    pause='pause'
}
export interface Time {
    hours: number,
    minutes: number,
    seconds: number,
}

export const activities = {
    work: {
        name: 'Работа',
        color: '#0288D1'
    },
    study: {
        name: 'Учеба',
        color: '#e03535',
    },
    learn: {
        name: 'Развитие',
        color: '#01AD54FF',
    },
    diplomа: {
        name: 'Диплом',
        color: '#CE0B77FF',
    }
}

export enum PagesLink {
    main= '/',
    charts = '/Charts',
    settings = '/Settings'
}

export const monthsArr = [
    'Январь', 'Февраль',
    'Март', 'Апрель', 'Май',
    'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь',
    'Декабрь'
]
export interface Month {
    name:string,
    value: number,
}


export interface ActivityItem {
    startTime: string,
    duration: number,
    currentActivity: string,
}

const audio1 = require("../audio/Лада седан.ogg");
const audio2 = require("../audio/90.mp3");
const audio3 = require("../audio/кавказская.mp3")
const audio4 = require("../audio/награждение.mp3")
const audio5 = require("../audio/Цыган.mp3")

export interface IAudio {
    id: string,
    name: string,
    url: any,
}

export const audios: IAudio[] = [
    {
        id: 'audio-1',
        name: 'Лада седан',
        url: audio1
    },
    {
        id: 'audio-2',
        name: 'Хит 90-х',
        url: audio2
    },
    {
        id: 'audio-3',
        name: 'Кавказская',
        url: audio3
    },
    {
        id: 'audio-4',
        name: 'Награждение в клубе',
        url: audio4
    },
    {
        id: 'audio-5',
        name: 'Ай дигид диди дай',
        url: audio5
    },
]

export interface IactionsWithMusic {
    id: string,
    actionName: string,
    musicName: string,
    musicUrl: any
}
export enum actions {
    play='play',
    pause='pause',
    stop='stop',
    pomodorro_chill='pomodorro chill',
    pomodorro_work='pomodorro work'
}

export const actionsWithMusic: IactionsWithMusic[] = [
    {
        id: 'audio-1',
        actionName: actions.play,
        musicName: "Ай дигид диди дай",
        musicUrl: audio5
    },
    {
        id: 'audio-2',
        actionName: actions.pause,
        musicName: "Хит 90-х",
        musicUrl: audio2
    },
    {
        id: 'audio-3',
        actionName: actions.stop,
        musicName: "Награждение в клубе",
        musicUrl: audio4
    },
    {
        id: 'audio-4',
        actionName: actions.pomodorro_chill,
        musicName: "Кавказская",
        musicUrl: audio3
    },
    {
        id: 'audio-5',
        actionName: actions.pomodorro_work,
        musicName: "Лада седан",
        musicUrl: audio1
    }
]





