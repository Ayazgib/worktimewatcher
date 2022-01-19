import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {PlayArrow, Pause, Stop} from '@mui/icons-material';
import {makeStyles, createStyles} from "@mui/styles";

import {Timer} from './Timer'
import {ActivityItem, clockStatus, activities, savedConstName, actions} from '../common/models'
import KeepMountedModal from './modal'
import moment from "moment";
import {connect, useDispatch, useSelector} from 'react-redux'

import {
    changeActivity,
    changeClockStatus,
    changeTimer, incrementPomodorroCount, setDataFromLS,
    setDurationHHMMSS, setShouldOpenModal,
    setStartTime, toggleFromPomodorro,
    toggleModal
} from "../redux/actions";
import internal from "stream";
import {Theme} from "@mui/material";
import {togglePlayingMusic} from "../common/functions";



function StartPage(props: any) {
    const [durationSecond, setDurationSecond] = useState<number>(0);
    const [allActivities, setAllActivities] = useState<any>();
    const [timerInterval, setTimerInterval] = useState<any>()
    const [savedTimeLocal, setSavedTimeLocal] = useState<any>([]);
    const [pomodorroTimer, setPomodorroTimer] = useState<any>()

    const state = useSelector((state:any) => state)
    const {currentActivity,clockCurrentStatus, isOpenModal,shouldOpenModal,
        isStartTimer, startTime ,
        isPomodorroTimer, savedTime, pomodorroCount} = state.timer
     const {dataFromLs} = state.global
    const {hours, minutes, seconds} = state.timer.time;
    const {pomodorroIsActive, pomodorroTime, musicActions, musicIsActive} = state.settings

    useEffect(() => {
        setSavedTimeLocal(savedTime);
    } ,[savedTime])


    const dispatch = useDispatch()

    //получение видов деятельности
    useEffect(() => {
        if (activities) {
            setAllActivities(activities);
        }
    } ,[])

    //управление модальным окном
    const handleOpen = () => dispatch(toggleModal(true))
    useEffect(() => {
        if (!isOpenModal && clockCurrentStatus === clockStatus.stop) {
            dispatch(changeTimer({hours: 0, minutes: 0, seconds: 0}))
        }
    } , [isOpenModal])


    useEffect(() => {
        if (clockCurrentStatus === clockStatus.start) {
            if (musicIsActive) togglePlayingMusic(actions.play, musicActions);
            dispatch(setStartTime(moment().format()))
            let timer;
            if (pomodorroIsActive) {
                clearTimeout(pomodorroTimer);
                timer = setTimeout(() => {
                    let pomodorroChillHour = Math.trunc(pomodorroTime.chill / 60),
                        pomodorroChillMinutes = pomodorroTime.chill - pomodorroChillHour * 60,
                        pomodorroWorkHour = Math.trunc(pomodorroTime.work / 60) ,
                        pomodorroWorkMinutes = pomodorroTime.work  - pomodorroWorkHour * 60;
                    dispatch(incrementPomodorroCount(pomodorroCount+1));
                    dispatch(toggleFromPomodorro({hours: Number(pomodorroWorkHour), minutes: Number(pomodorroWorkMinutes), seconds: 0}, true))
                    dispatch(changeTimer({hours: pomodorroChillHour, minutes: pomodorroChillMinutes - 1, seconds: 59}));
                } , (pomodorroTime.work * 60000) + 3000)
            }
            if (timer) {
                setPomodorroTimer(timer);
            }
        }
        if (clockCurrentStatus === clockStatus.stop) handleStop();
    }, [clockCurrentStatus]);


    useEffect(() => {
        let timer;
        clearTimeout(pomodorroTimer);
        if (pomodorroIsActive && !isPomodorroTimer) {
            timer = setTimeout(() => {
                if (musicIsActive) togglePlayingMusic(actions.pomodorro_chill, musicActions);

                let pomodorroChillHour = Math.trunc(pomodorroTime.chill / 60),
                    pomodorroChillMinutes = pomodorroTime.chill - pomodorroChillHour * 60,
                    pomodorroWorkHour = Math.trunc((pomodorroTime.work * pomodorroCount ? pomodorroCount : 1)/ 60) ,
                    pomodorroWorkMinutes = (pomodorroTime.work * pomodorroCount ? pomodorroCount : 1) - pomodorroWorkHour * 60;
                console.log(pomodorroWorkHour, pomodorroWorkMinutes);
                dispatch(toggleFromPomodorro({hours: Number(pomodorroWorkHour), minutes: Number(pomodorroWorkMinutes), seconds: 0}, true))
                dispatch(changeTimer({hours: pomodorroChillHour, minutes: pomodorroChillMinutes - 1, seconds: 59}));
            } , (pomodorroTime.work * 60000))
        }
        if (isPomodorroTimer) {
            timer = setTimeout(() => {
                if (musicIsActive) togglePlayingMusic(actions.pomodorro_work, musicActions);
                dispatch(changeTimer({hours: savedTime.hours, minutes: savedTime.minutes, seconds: savedTime.seconds}));
                dispatch(incrementPomodorroCount(pomodorroCount+1));
                dispatch(toggleFromPomodorro({hours: 0, minutes: 0, seconds: 0}, false))
            } , pomodorroTime.chill * 60000)
        }
        if (timer) {
            setPomodorroTimer(timer);
        }
    } ,[isPomodorroTimer])

    useEffect(() => {
        let timer;
        clearInterval(timerInterval);
        if (isStartTimer) {
            if (isPomodorroTimer) {
                timer = setInterval(() => {
                    if (seconds === 0) {
                        dispatch(changeTimer({hours, minutes: minutes - 1, seconds: 59}));
                        return
                    }
                    if (minutes === 59) {
                        dispatch(changeTimer({hours: hours - 1, minutes: 0, seconds: seconds}))
                        return;
                    }

                    dispatch(changeTimer({hours, minutes, seconds: seconds - 1}))
                }, 1000);
            } else {
                timer = setInterval(() => {
                    if (seconds === 59) {
                        dispatch(changeTimer({hours, minutes: minutes + 1, seconds: 0}));
                        return
                    }
                    if (minutes === 59) {
                        dispatch(changeTimer({hours: hours + 1, minutes: 0, seconds: seconds}))
                        return;
                    }

                    dispatch(changeTimer({hours, minutes, seconds: seconds + 1}))
                }, 1000);
            }

            setTimerInterval(timer);
        } else if (clockCurrentStatus === clockStatus.pause){
            if (musicIsActive) togglePlayingMusic(actions.pause, musicActions);
        }

    }, [isStartTimer, seconds, minutes])



    //TODO LAST ACTIVE ACTIVITY
    // менять фон
    const handleStop = () => {
        if (musicIsActive) togglePlayingMusic(actions.stop, musicActions);
        clearTimeout(pomodorroTimer);
        let durationSec =  hours * 3600000 + minutes * 60000+ seconds * 1000
        setDurationSecond(durationSec);
        dispatch(setDurationHHMMSS(`${hours}:`+`${minutes}:`+`${seconds}`))
        if (shouldOpenModal) {
            handleOpen();
        } else {
            dispatch(setShouldOpenModal(true));
        }
        setToLocaleStorage(startTime, durationSec)
    }

    const setToLocaleStorage = (startTime: string, duration: number) => {
        let data = dataFromLs
        const dataNewItem = { startTime, duration, currentActivity}
        data.push(dataNewItem);
        dispatch(setDataFromLS(data));
        localStorage.setItem(savedConstName, JSON.stringify(data));
    }
    //изменение вида деятельности
    const handleChangeActivity = (event: any, newType: any) => {
        dispatch(changeActivity(newType));
    };


    return (
    <div className='mainBlock'>
        <ToggleButtonGroup
            color="primary"
            value={currentActivity}
            exclusive
            onChange={handleChangeActivity}
        >
            {
                allActivities
                    ? Object.entries(activities).map(([key, value]) => {
                        return <ToggleButton key={key} value={key}>{value.name}</ToggleButton>
                    })
                    : null
            }
        </ToggleButtonGroup>
        <Timer />
        <div>
            {
                clockCurrentStatus != clockStatus.start
                    ? <Tooltip title="Start"  arrow>
                        <Button variant='contained' color='info' size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.start, true))}}>
                            <PlayArrow  fontSize="inherit" />
                        </Button>
                    </Tooltip>
                    : <Tooltip title="Pause" arrow>
                        <Button variant='contained' color='info' size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.pause, false))}}>
                            <Pause fontSize="inherit" />
                        </Button>
                    </Tooltip>
            }
            <Tooltip title="Stop" arrow>
                <Button style={{marginLeft: 20}} variant='contained' color='info' size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.stop, false))}}>
                    <Stop fontSize="inherit" />
                </Button>
            </Tooltip>
        </div>
    </div>
);
}

export default StartPage;
