import React, {useState, useEffect, useRef, useContext} from 'react';


interface ClockProps {
    hours: number,
    minuts: number,
    seconds: number,
}

export const Timer = (props: ClockProps) => {


    return <div style={{display: 'flex', alignItems: 'center'}}>
        <h1>{props.hours < 10 ? '0' + props.hours : props.hours}</h1><span>:</span>
        <h1>{props.minuts < 10 ? '0' +props.minuts : props.minuts}</h1><span>:</span>
        <h1>{props.seconds < 10 ? '0' + props.seconds : props.seconds}</h1>
    </div>
}

