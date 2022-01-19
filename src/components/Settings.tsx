import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ReactAudioPlayer from 'react-audio-player';
import {connect, useDispatch, useSelector} from 'react-redux'
import {audios, savedConstName} from "../common/models";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    changeActivity,
    changeClockStatus,
    changeTimer, setDataFromLS,
    setDurationHHMMSS, setPomodorroTime, setShouldOpenModal,
    setStartTime,
    toggleModal, togglePomodorro
} from "../redux/actions";
import {MenuItem, Select, TextField} from "@mui/material";
import {Button} from "@mui/material/";
import Typography from "@mui/material/Typography";


function Settings(props: any) {
    const [savedToLSName, setSavedToLSName] = useState<string>(savedConstName + '/settings')
    const state = useSelector((state:any) => state)
    const {pomodorroIsActive, pomodorroTime} = state.settings

    const dispatch = useDispatch()


    // const handlePlay = (index: number) => {
    //     let a = new Audio(audios[index].url);
    //     a.play();
    // }
    //
    // const [expanded, setExpanded] = React.useState(false);


    const handleChangeTime = (e: any, timeType: string) => {
        if (timeType === 'work') {
            dispatch(setPomodorroTime(e.target.value,+pomodorroTime.chill))
        } else {
            dispatch(setPomodorroTime(+pomodorroTime.work, e.target.value))
        }
    }

    const handleSave = (showModal: boolean = true) => {
        let savedItem: any = {
            pomodorroIsActive,
            pomodorroTime
        }
        savedItem = JSON.stringify(savedItem);
        localStorage.setItem(savedToLSName, savedItem)
        if (showModal) alert('Данные успешно сохранены')
    }

    return (
        <div className='settingsWrapper'>
            <FormControl component="fieldset">
                <FormLabel component="legend">Техника "Помодорро</FormLabel>
                <FormGroup aria-label="position" row className='settings-pomodorro-group'>
                    <FormControlLabel
                        control={<Checkbox checked={pomodorroIsActive}/>}
                        label='Активировать'
                        labelPlacement='start'
                        onChange={() => dispatch(togglePomodorro(!pomodorroIsActive))}
                    />
                    {
                        pomodorroIsActive
                            ? <div style={{marginLeft: 30}}>
                                <TextField id="outlined-basic" value={pomodorroTime.work} label="Время работы (мин)" variant="outlined" onChange={(e) => handleChangeTime(e,"work")} />
                                <TextField id="outlined-basic" style={{marginLeft: 20}} value={pomodorroTime.chill} label="Время отдыха (мин)" onChange={(e) => handleChangeTime(e,"chill")} variant="outlined" />
                            </div>
                            : null
                    }
                </FormGroup>
            </FormControl>
            <Button style={{alignSelf: 'flex-end'}} variant="outlined" onClick={() => handleSave()}>СОХРАНИТЬ</Button>

            {/*<FormControl component="fieldset">*/}
            {/*    <FormLabel component="legend">Техника "Помодорро</FormLabel>*/}
            {/*    <FormGroup aria-label="position" row className='settings-pomodorro-group'>*/}
            {/*        <FormControlLabel*/}
            {/*            value={pomodorroIsActive}*/}
            {/*            control={<Checkbox />}*/}
            {/*            label='Активировать'*/}
            {/*            labelPlacement='start'*/}
            {/*            onChange={handleToggleMusic}*/}
            {/*        />*/}
            {/*        {*/}
            {/*            pomodorroIsActive*/}
            {/*                ? <div style={{marginLeft: 30}}>*/}
            {/*                    <TextField id="outlined-basic" value={pomodorraTime.work} label="Время работы" variant="outlined" />*/}
            {/*                    <TextField id="outlined-basic" style={{marginLeft: 20}}value={pomodorraTime.chill} label="Время отдыха" variant="outlined" />*/}
            {/*                </div>*/}
            {/*                : null*/}
            {/*        }*/}
            {/*    </FormGroup>*/}
            {/*</FormControl>*/}
            {/*<Accordion expanded={expanded} onChange={() => {*/}
            {/*    setExpanded(!expanded);*/}
            {/*}}>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon />}*/}
            {/*        aria-controls="panel1bh-content"*/}
            {/*        id="panel1bh-header"*/}
            {/*    >*/}
            {/*        <Typography sx={{ width: '33%', flexShrink: 0 }}>*/}
            {/*            General settings*/}
            {/*        </Typography>*/}
            {/*        <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            {/*        <Typography>*/}
            {/*            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.*/}
            {/*            Aliquam eget maximus est, id dignissim quam.*/}
            {/*        </Typography>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
        </div>
    );
}

export default Settings;
