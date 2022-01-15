import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {changeClockStatus, changeTimer, setDataFromLS, setIsWarning} from "../redux/actions";
import {clockStatus, savedConstName} from "../common/models";
import moment from "moment";
export default function AlertDialog() {

    const state = useSelector((state:any) => state)
    const {isWarning,warningTarget, startTime, currentActivity} = state.timer
    const {dataFromLs} = state.global

    const dispatch = useDispatch()

    const handleAgree = () => {
        dispatch(setIsWarning(false, null));
        dispatch(changeClockStatus(clockStatus.start, true))
    }

    const handleDisagree = () => {
        dispatch(changeClockStatus(clockStatus.stop, false, false))
        warningTarget.target.click();
        dispatch(setIsWarning(false, null));
    }

    return (
        <div>
            <Dialog
                open={isWarning}
                onClose={handleAgree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Вы переходите на другую страницу.
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        При переходе таймер сбросится. Продолжить работу таймера и остаться в текущем окне?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgree} autoFocus>
                        Да
                    </Button>
                    <Button onClick={handleDisagree}>Нет</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}