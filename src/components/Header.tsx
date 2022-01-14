import React from "react";
import {NavLink} from "react-router-dom";
import {PagesLink} from "../common/models";
import { Theme, Typography} from "@mui/material/";

import {makeStyles, createStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
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

    return (
        <header className={classes.header}>
            <nav style={{display: 'flex'}}>
                <NavLink className={classes.headerLink} to={PagesLink.main} >
                    <Typography variant="h6" component="div">
                        Главная
                    </Typography>
                </NavLink>
                <NavLink className={classes.headerLink} to={PagesLink.charts} >
                    <Typography variant="h6" component="div">
                        Анализ
                    </Typography>
                </NavLink>
            </nav>
        </header>
    )
}