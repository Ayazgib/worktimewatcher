import React from "react";
import {NavLink} from "react-router-dom";
import {clockStatus, PagesLink} from "../common/models";
import { Theme, Typography, ToggleButton} from "@mui/material/";
import {makeStyles, createStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {changeClockStatus, setIsWarning} from "../redux/actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
        },
        headerLink: {
            padding: 5,
            fontSize: 23,
            textDecoration: 'none',
            color: 'white',
            textTransform: 'uppercase',
        }
    }),
);

export const Header = () => {
    const classes = useStyles()

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
        <header className={classes.header}>
            <nav style={{display: 'flex'}}>
                <NavLink className={classes.headerLink} to={PagesLink.main} >
                    <ToggleButton value='Главная'>
                        Главная
                    </ToggleButton>
                </NavLink>
                <NavLink className={classes.headerLink} to={PagesLink.charts} onClick={handleOpenWarning}>
                    <ToggleButton value='Анализ'>
                       Анализ
                    </ToggleButton>
                </NavLink>
                <button onClick={() => {
                    localStorage.clear();
                }}>CLEAR</button>
            </nav>
        </header>
    )
}