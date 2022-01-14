import exp from "constants";

export enum clockStatus {
    notStarted= -1,
    stop,
    start,
    pause
}
export interface Time {
    hours: number,
    minutes: number,
    seconds: number,
}

export enum activities {
    work = 'Работа',
    study = 'Учеба',
    learn = 'Развитие',
    diplomа = 'Диплом',
}
export interface Iactivity {
    [key: string]: string
}
export enum PagesLink {
    main= '/',
    charts = '/Charts',
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