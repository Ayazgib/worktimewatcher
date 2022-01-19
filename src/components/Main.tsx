import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
    ActivityItem,
    clockStatus,
    activities,
    savedConstName,
    PagesLink,
    audios,
    actionsWithMusic
} from '../common/models'
import KeepMountedModal from './modal'

import StartPage from "./StartPage";
import {Charts} from "./Charts";
import AlertDialog from "./Alert";
import {
    reorderMusic,
    setDataFromLS,
    setPomodorroTime,
    toggleMusic,
    togglePomodorro,
    toggleTheme
} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Settings from "./Settings";
import {darkTheme, lightTheme, GlobalStyles} from "./theme";
import { ThemeProvider } from 'styled-components';


function Main(props: any) {
    const state = useSelector((state:any) => state)

    const {theme} = state.settings

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
            if (savedItem.pomodorro) {
                dispatch(togglePomodorro(savedItem.pomodorro.pomodorroIsActive))
                dispatch(setPomodorroTime(+savedItem.pomodorro.pomodorroTime.work,+savedItem.pomodorro.pomodorroTime.chill))
            }
            if (savedItem.music) {
                dispatch(toggleMusic(savedItem.music.musicIsActive))
                dispatch(reorderMusic(savedItem.music.actionsMusic))
            }
            if (savedItem.theme) {
                dispatch(toggleTheme(savedItem.theme))
            }
        } else  {
            //default variable
            dispatch(togglePomodorro(false))
            dispatch(setPomodorroTime(20,5))
            dispatch(toggleMusic(false))
            dispatch(reorderMusic(actionsWithMusic))
            dispatch(toggleTheme('light'));
        }


    } ,[])


    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme} >
            <GlobalStyles />
            <main className='container'>
            <Routes>
                <Route path={PagesLink.main} element={<StartPage />} />
                <Route path={PagesLink.charts} element={<Charts />} />
                <Route path={PagesLink.settings} element={<Settings />} />
            </Routes>
            <KeepMountedModal />
            <AlertDialog />
        </main>
        </ThemeProvider>

    );
}

export default Main;
