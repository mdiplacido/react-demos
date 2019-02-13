import React from 'react'

export interface StopwatchDigitsProps {
    hours: number;
    minutes: number;
    seconds: number;
}

const StopwatchDigits = (props: StopwatchDigitsProps) => {
    return (
        <div>
            {("0" + props.hours).slice(-2)} : {("0" + props.minutes).slice(-2)} : {("0" + props.seconds).slice(-2)}
        </div>
    )
}

export default StopwatchDigits
