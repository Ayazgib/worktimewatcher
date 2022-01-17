import exp from "constants";
export const savedConstName = 'app_data';

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

export const activities = {
    work: {
        name: 'Работа',
        color: '#061157FF'
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