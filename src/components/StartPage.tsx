import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {PlayArrow, Pause, Stop} from '@mui/icons-material';
import Timer from './Timer'
import {ActivityItem, clockStatus, activities, Iactivity} from '../common/models'
import KeepMountedModal from './modal'
import moment from "moment";
import {connect, useDispatch, useSelector} from 'react-redux'
import {changeActivity, changeClockStatus, changeTimer} from "../redux/actions";
import internal from "stream";



function StartPage(props: any) {
    const [startTime, setStartTime] = useState<string>('');
    const [durationSecond, setDurationSecond] = useState<number>(0);
    const [durationHHMMSS, setDurationHHMMSS] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [allActivities, setAllActivities] = useState<Iactivity>();
    const [isStartTimer, setIsStartTimer] = useState<boolean>(false);
    const [timerInterval, setTimerInterval] = useState<any>()

    const state = useSelector((state:any) => state.timer)
    const {currentActivity,clockCurrentStatus} = state
    const {hours, minutes, seconds} = state.time;

    const dispatch = useDispatch()

    useEffect(() => {
        if (activities && Object.keys(activities).length) {
            setAllActivities(activities);
        }
    } ,[])

    useEffect(() => {
        if (!openModal && clockCurrentStatus === 0) {
            dispatch(changeTimer({hours: 0, minutes: 0, seconds: 0}))
            setIsStartTimer(false);
        }
    } , [openModal])

    const handleOpen = () => setOpenModal(true)
    const handleClose = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        if (clockCurrentStatus === 1) handleStart();
        if (clockCurrentStatus === 0) {
            handleStop();
            console.log(hours, minutes, seconds);
            dispatch(changeTimer({hours, minutes, seconds}))
            setIsStartTimer(false);
        }
        if (clockCurrentStatus === 2) setIsStartTimer(false);
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
        setStartTime(moment().format())
        setIsStartTimer(true);
    }

    const handleStop = () => {
        let durationSec = Date.parse(moment().format()) - Date.parse(startTime)
        setDurationSecond(durationSec);
        setDurationHHMMSS(`${hours}:`+`${minutes}:`+`${seconds}`);
        handleOpen();
        setToLocaleStorage(startTime, durationSec)

        setTimeout(() => {
            dispatch(changeTimer({hours: 0, minutes: 0, seconds: 0}))
        }, 6000)
    }



    const handleChangeActivity = (event: any, newType: any) => {
        dispatch(changeActivity(newType));
    };


    const setToLocaleStorage = (startTime: string, duration: number) => {
        const dataNewItem = { startTime, duration, currentActivity}
        let data = props.data;
        data.push(dataNewItem);
        props.setData(data);
        localStorage.setItem('app_data', JSON.stringify(data));
    }

    return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <KeepMountedModal  durationHHMMSS={durationHHMMSS} handleClose={handleClose} openModal={openModal}/>
        <ToggleButtonGroup
            color="primary"
            value={currentActivity}
            exclusive
            onChange={handleChangeActivity}
        >
            {
                allActivities
                    ? Object.entries(activities).map(([key, value]) => {
                        return <ToggleButton key={key} value={key}>{value}</ToggleButton>
                    })
                    : null
            }
        </ToggleButtonGroup>
        <Timer /> {/*hours={hours} minuts={minuts} seconds={seconds}*/}
        <div>
            {
                clockCurrentStatus != 1
                    ? <Tooltip title="Start" arrow>
                        <IconButton size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.start))}}>
                            <PlayArrow fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    : <Tooltip title="Pause" arrow>
                        <IconButton  size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.pause))}}>
                            <Pause fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
            }
            <Tooltip title="Stop" arrow>
                <IconButton  size="large" onClick={() => {dispatch(changeClockStatus(clockStatus.stop))}}>
                    <Stop fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </div>
    </div>
);
}

export default StartPage;
