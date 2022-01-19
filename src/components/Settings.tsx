import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ReactAudioPlayer from 'react-audio-player';
import {connect, useDispatch, useSelector} from 'react-redux'
import {actionsWithMusic, audios, IactionsWithMusic, savedConstName} from "../common/models";
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
    toggleModal, toggleMusic, togglePomodorro
} from "../redux/actions";
import {MenuItem, Select, TextField} from "@mui/material";
import {Button} from "@mui/material/";
import Typography from "@mui/material/Typography";
import {MusicDND} from "./MusicDND";


function Settings(props: any) {
    const [savedToLSName, setSavedToLSName] = useState<string>(savedConstName + '/settings')

    const state = useSelector((state:any) => state)
    const {pomodorroIsActive, pomodorroTime, musicIsActive,musicActions} = state.settings

    const dispatch = useDispatch()

    const handleChangeTime = (e: any, timeType: string) => {
        if (timeType === 'work') {
            dispatch(setPomodorroTime(e.target.value,+pomodorroTime.chill))
        } else {
            dispatch(setPomodorroTime(+pomodorroTime.work, e.target.value))
        }
    }

    const handleSave = (showModal: boolean = true) => {
        let actionsMusic = actionsWithMusic.map((item: any, index) => {
            return {...item, musicName: musicActions[index].musicName, musicUrl: musicActions[index].musicUrl}
        })
        let savedItem: any = {
            pomodorro: {
                pomodorroIsActive,
                pomodorroTime,
            },
            music: {
                musicIsActive,
                actionsMusic,
            }
        }
        savedItem = JSON.stringify(savedItem);
        localStorage.setItem(savedToLSName, savedItem)
        if (showModal) alert('Данные успешно сохранены')
    }



    return (
        <div className='settingsWrapper'>
            <FormControl component="fieldset">
                <FormLabel component="legend">Техника "Помодорро</FormLabel>
                <FormGroup aria-label="position" row className='settings-item-group'>
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
            <FormControl component="fieldset" >
                <FormLabel component="legend">Музыкальный отклик</FormLabel>
                <FormGroup aria-label="position" className='settings-item-group'>
                    <FormControlLabel
                        control={<Checkbox checked={musicIsActive}/>}
                        label='Активировать'
                        labelPlacement='start'
                        onChange={() => dispatch(toggleMusic(!musicIsActive))}
                        className='settings-form-label'
                    />
                    {
                        musicIsActive
                            ? <div style={{display: 'flex', justifyContent: "space-between"}}>
                                {
                                    actionsWithMusic.length
                                        ? <div className='settings-action-wrapper'>
                                            {
                                                actionsWithMusic.map((actions: IactionsWithMusic, index) =>
                                                    <h4 key={index} className='settings-action-name'>{actions.actionName}</h4>
                                                )
                                            }
                                         </div>
                                        : null
                                }
                                <MusicDND />
                            </div>
                            : null
                    }
                </FormGroup>
            </FormControl>
            <Button style={{alignSelf: 'flex-end'}} variant="outlined" onClick={() => handleSave()}>СОХРАНИТЬ</Button>

        </div>
    );
}

export default Settings;
