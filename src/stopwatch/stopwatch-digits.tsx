import React from 'react'

export interface StopwatchDigitsProps {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

const StopwatchDigits = (props: StopwatchDigitsProps) => {
    return (
        <div>
            {props.hours < 10 ? "0" + props.hours : props.hours} : {("0" + props.minutes).slice(-2)} : {("0" + props.seconds).slice(-2)}.{("00" + props.milliseconds).slice(-3)}
        </div>
    )
}

export default StopwatchDigits
