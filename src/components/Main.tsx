import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {ToggleButton, ToggleButtonGroup, Tooltip, Button, IconButton} from '@mui/material/';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {ActivityItem, clockStatus, activities, Iactivity, savedConstName, PagesLink} from '../common/models'
import KeepMountedModal from './modal'

import StartPage from "./StartPage";
import {Charts} from "./Charts";
import AlertDialog from "./Alert";
import {setDataFromLS} from "../redux/actions";
import {useDispatch} from "react-redux";



function Main(props: any) {
    const dispatch = useDispatch()

    useEffect(() => {
        const dataFromLS = localStorage.getItem(savedConstName);
        let data = [];
        if (dataFromLS) data = JSON.parse(dataFromLS);
        dispatch(setDataFromLS(data));
    } ,[])

    return (
        <main className='container'>
            <Routes>
                <Route path={PagesLink.main} element={<StartPage />} />
                <Route path={PagesLink.charts} element={<Charts />} />
            </Routes>
            <KeepMountedModal />
            <AlertDialog />
        </main>
    );
}

export default Main;
