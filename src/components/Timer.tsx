import React, {useState, useEffect, useRef, useContext} from 'react';
import {connect} from 'react-redux'



const Timer = (props: any) => {
    const {hours, minuts, seconds} = props

    return <div style={{display: 'flex', alignItems: 'center'}}>
        <h1>{hours < 10 ? '0' + hours : hours}</h1><span>:</span>
        <h1>{minuts < 10 ? '0' + minuts : minuts}</h1><span>:</span>
        <h1>{seconds < 10 ? '0' + seconds : seconds}</h1>
    </div>
}

const mapStateToProps = (state: any) => {
    return {
        hours: state.timer.hours,
        minuts: state.timer.minuts,
        seconds: state.timer.seconds
    }
}

export default connect(mapStateToProps,)(Timer)

