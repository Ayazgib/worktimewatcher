import React from "react";
import {NavLink} from "react-router-dom";
import {clockStatus, PagesLink} from "../common/models";
import { Theme, Typography} from "@mui/material/";

import {makeStyles, createStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {changeClockStatus, setIsWarning} from "../redux/actions";


export const Header = () => {

    const state = useSelector((state:any) => state.timer)
    const { isStartTimer, isWarning} = state

    const dispatch = useDispatch()
    const handleOpenWarning = (e: any) => {
        if (isStartTimer) {
            e.preventDefault()
            dispatch(changeClockStatus(clockStatus.pause, false))
            dispatch(setIsWarning(true, e))
        }
    }

    return (
        <header className='header'>
            <nav style={{display: 'flex'}}>
                <NavLink className='headerLink' to={PagesLink.main} >
                    <Typography variant="h6" component="div">
                        Главная
                    </Typography>
                </NavLink>
                <NavLink className='headerLink' to={PagesLink.charts} onClick={handleOpenWarning}>
                    <Typography variant="h6" component="div">
                        Анализ
                    </Typography>
                </NavLink>
                <button onClick={() => {
                    localStorage.clear();
                }}>CLEAR</button>
            </nav>
        </header>
    )
}