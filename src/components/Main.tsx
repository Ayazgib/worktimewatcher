import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {ActivityItem, clockStatus, activities, savedConstName, PagesLink} from '../common/models'
import KeepMountedModal from './modal'

import StartPage from "./StartPage";
import {Charts} from "./Charts";
import AlertDialog from "./Alert";
import {setDataFromLS, setPomodorroTime, togglePomodorro} from "../redux/actions";
import {useDispatch} from "react-redux";
import Settings from "./Settings";


function Main(props: any) {
    const dispatch = useDispatch()

    useEffect(() => {
        //данные по деятельности
        const dataFromLS = localStorage.getItem(savedConstName);
        let data = [];
        if (dataFromLS) data = JSON.parse(dataFromLS);
        dispatch(setDataFromLS(data));

        //данные по настройкам
        let savedToLSName = savedConstName + '/settings';
        let savedItem: any = localStorage.getItem(savedToLSName);
        if (savedItem) {
            savedItem = JSON.parse(savedItem);
            dispatch(togglePomodorro(savedItem.pomodorroIsActive))
            dispatch(setPomodorroTime(+savedItem.pomodorroTime.work,+savedItem.pomodorroTime.chill))
        } else  {
            //default variable
            dispatch(togglePomodorro(false))
            dispatch(setPomodorroTime(20,5))
        }

    } ,[])

    return (
        <main className='container'>
            <Routes>
                <Route path={PagesLink.main} element={<StartPage />} />
                <Route path={PagesLink.charts} element={<Charts />} />
                <Route path={PagesLink.settings} element={<Settings />} />
            </Routes>
            <KeepMountedModal />
            <AlertDialog />
        </main>
    );
}

export default Main;
