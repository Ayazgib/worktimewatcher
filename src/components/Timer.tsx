import React, {useState, useEffect, useRef, useContext} from 'react';
import {connect, useSelector} from 'react-redux'

export const Timer = (props: any) => {
    const {hours, minutes, seconds} = useSelector((state:any) => state.timer.time)

    return <div style={{display: 'flex', alignItems: 'center'}}>
        <h1>{hours < 10 ? '0' + hours : hours}</h1><span>:</span>
        <h1>{minutes < 10 ? '0' + minutes : minutes}</h1><span>:</span>
        <h1>{seconds < 10 ? '0' + seconds : seconds}</h1>
    </div>
}




