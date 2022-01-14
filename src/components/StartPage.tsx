import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {PlayArrow, Pause, Stop} from '@mui/icons-material';
import Timer from './Timer'
import {ActivityItem, clockStatus, activities, Iactivity} from '../common/models'
import KeepMountedModal from './modal'
import moment from "moment";
import {connect} from 'react-redux'
import {changeActivity} from "../redux/actions";



function StartPage(props: any) {
    const [clockActivity, setClockActivity] = useState<number>(-1);
    const [clockInterval, setClockInterval] = useState<any>();
    const [startTime, setStartTime] = useState<string>('');
    const [durationSecond, setDurationSecond] = useState<number>(0);
    const [durationHHMMSS, setDurationHHMMSS] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [hours, setHours] = useState<number>(0)
    const [minuts, setMinuts] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [allActivities, setAllActivities] = useState<Iactivity>()

    const {currentActivity, changeActivity} = props

    useEffect(() => {
        console.log(currentActivity);
    } ,[currentActivity])

    useEffect(() => {
        if (activities && Object.keys(activities).length) {
            setAllActivities(activities);
        }
    } ,[])

    useEffect(() => {
        if (!openModal && clockActivity === 0) {
            setMinuts(0);
            setSeconds(0);
            setHours(0);
        }
    } , [openModal])

    useEffect(() => {
        if (seconds === 59) {
            setSeconds(0);
            setMinuts(prev => ++prev)
        }
    } , [seconds])

    useEffect(() => {
        if (minuts === 59) {
            setMinuts(0);
            setHours(prev => ++prev)
        }
    } , [minuts])

    const handleOpen = () => setOpenModal(true)
    const handleClose = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        if (clockActivity === 1) handleStart();
        if (clockActivity === 0) handleStop();
        if (clockActivity === 2) clearInterval(clockInterval);
    }, [clockActivity]);


    const handleStart = () => {
        setStartTime(moment().format())
        const clock = setInterval(() => {
            setSeconds(prev => ++prev);
        } , 1000);

        setClockInterval(clock);
    }

    const handleStop = () => {
        let durationSec = Date.parse(moment().format()) - Date.parse(startTime)
        setDurationSecond(durationSec);
        setDurationHHMMSS(`${hours}:`+`${minuts}:`+`${seconds}`);
        clearInterval(clockInterval);
        handleOpen();
        setToLocaleStorage(startTime, durationSec)
        setTimeout(() => {
            setMinuts(0);
            setSeconds(0);
            setHours(0);
        }, 6000)
    }

    const handleChangeActivity = (event: any, newType: any) => {
        changeActivity(newType)
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
                clockActivity != 1
                    ? <Tooltip title="Start" arrow>
                        <IconButton size="large" onClick={() => {setClockActivity(clockStatus.start)}}>
                            <PlayArrow fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    : <Tooltip title="Pause" arrow>
                        <IconButton  size="large" onClick={() => {setClockActivity(clockStatus.pause)}}>
                            <Pause fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
            }
            <Tooltip title="Stop" arrow>
                <IconButton  size="large" onClick={() => {setClockActivity(clockStatus.stop)}}>
                    <Stop fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </div>
    </div>
);
}

const mapStateToProps = (state: any) => {
    return {
        currentActivity: state.timer.currentActivity
    }
}

const mapDispatchToProps = {
    changeActivity
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
