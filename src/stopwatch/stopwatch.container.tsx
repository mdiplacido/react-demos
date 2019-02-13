import React, { Component } from 'react'
import StopwatchDigits from './stopwatch-digits';

export default class StopwatchContainer extends Component {
  render() {
    return (
      <div>
        <h1>Hewwow, stopwatch!</h1>

        <StopwatchDigits hours={1} minutes={34} seconds={59} />
      </div>
    )
  }
}
