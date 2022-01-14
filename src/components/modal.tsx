import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

interface IModal {
    handleClose: () => void;
    openModal: boolean;
    durationHHMMSS: string;
}

export default function KeepMountedModal(props: IModal) {
    const [duration, setDuration] = useState<string[]>([])
    const [timerWordCase, setTimerWordCase] = useState<string[]>(['часов', 'минут', 'секунд'])

    useEffect(() => {
        const duration = props.durationHHMMSS.split(':');
        const wordCases = timerWordCase;

        if (Number(duration[0]) === 1) {
            wordCases[0] = 'час'
        } else if (Number(duration[0]) && Number(duration[0]) < 5) {
            wordCases[0] = 'часа'
        }

        if (Number(duration[1]) === 1) {
            wordCases[1] = 'минуту'
        } else if (Number(duration[1]) && Number(duration[1]) < 5) {
            wordCases[1] = 'минуты'
        }

        if (Number(duration[2]) === 1) {
            wordCases[2] = 'секунду'
        } else if (Number(duration[2]) && Number(duration[2]) < 5 ) {
            wordCases[2] = 'секунды'
        }

        setDuration(duration);
    } ,[props.durationHHMMSS])

    return (
        <div>
            <Modal
                keepMounted
                open={props.openModal}
                onClose={props.handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className='modal'>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Таймер отключен.
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }} style={{display: 'flex'}}>
                        Вы потратили:
                        {duration.length
                            ? <span>
                                {
                                    +duration[0]
                                        ? <span> <b>{duration[0]}</b> {timerWordCase[0]}</span>
                                        : null
                                }
                                {
                                    +duration[1]
                                        ? <span> <b>{duration[1]}</b> {timerWordCase[1]}</span>
                                        : null
                                }
                                <span><b>{duration[2]}</b> {timerWordCase[2]}</span>
                            </span>
                            : null
                        }
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}