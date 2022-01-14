import React, {useState, useEffect, useRef, useContext} from 'react';
import {connect} from 'react-redux'



const Timer = (props: any) => {
    const {hours, minutes, seconds} = props.time

    return <div style={{display: 'flex', alignItems: 'center'}}>
        <h1>{hours < 10 ? '0' + hours : hours}</h1><span>:</span>
        <h1>{minutes < 10 ? '0' + minutes : minutes}</h1><span>:</span>
        <h1>{seconds < 10 ? '0' + seconds : seconds}</h1>
    </div>
}

const mapStateToProps = (state: any) => {
    return {
        time: state.timer.time
    }
}

export default connect(mapStateToProps,)(Timer)

