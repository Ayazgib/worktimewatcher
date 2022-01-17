import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {PlayArrow, Pause, Stop} from '@mui/icons-material';
import {makeStyles, createStyles} from "@mui/styles";

import {Timer} from './Timer'
import {ActivityItem, clockStatus, activities,  savedConstName} from '../common/models'
import KeepMountedModal from './modal'
import moment from "moment";
import {connect, useDispatch, useSelector} from 'react-redux'

import {
    changeActivity,
    changeClockStatus,
    changeTimer, setDataFromLS,
    setDurationHHMMSS, setShouldOpenModal,
    setStartTime,
    toggleModal
} from "../redux/actions";
import internal from "stream";
import {Theme} from "@mui/material";



function StartPage(props: any) {
    const [durationSecond, setDurationSecond] = useState<number>(0);
    const [allActivities, setAllActivities] = useState<any>();
    const [timerInterval, setTimerInterval] = useState<any>()


    const state = useSelector((state:any) => state)
    const {currentActivity,clockCurrentStatus, isOpenModal, isStartTimer, startTime, shouldOpenModal} = state.timer
     const {dataFromLs} = state.global
    const {hours, minutes, seconds} = state.timer.time;

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
        if (!isOpenModal && clockCurrentStatus === 0) {
            dispatch(changeTimer({hours: 0, minutes: 0, seconds: 0}))
        }
    } , [isOpenModal])

    useEffect(() => {
        if (clockCurrentStatus === 1) handleStart();
        if (clockCurrentStatus === 0) {
            handleStop();
        }
    }, [clockCurrentStatus]);

    useEffect(() => {
        let timer;
        clearInterval(timerInterval);
        if (isStartTimer) {
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
            setTimerInterval(timer);
        }

    }, [isStartTimer, seconds, minutes])

    const handleStart = () => {
        dispatch(setStartTime(moment().format()))
    }

    const handleStop = () => {
        let durationSec = Date.parse(moment().format()) - Date.parse(startTime)
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
        console.log(newType);
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
                clockCurrentStatus != 1
                    ? <Tooltip title="Start" arrow>
                        <IconButton size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.start, true))}}>
                            <PlayArrow fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    : <Tooltip title="Pause" arrow>
                        <IconButton  size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.pause, false))}}>
                            <Pause fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
            }
            <Tooltip title="Stop" arrow>
                <IconButton  size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.stop, false))}}>
                    <Stop fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </div>
    </div>
);
}

export default StartPage;
