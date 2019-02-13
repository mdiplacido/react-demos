import React, { Component } from "react";

import StopwatchDigits from "./stopwatch-digits";

interface StopWatchState {
  lastMark?: Date;
  isRunning: boolean;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalElapsedMilliseconds: number;
  currentElapsedMilliseconds: number;
}

const FramesPerSecond = 24;
const MillisecondsInHour = 60 * 60 * 1000;
const MillisecondsInMinute = 60 * 1000;
const MillisecondsInSecond = 1000;

const calcTime = (unitMilliseconds: number) => (remaining: number) => {
  const total = Math.floor(remaining / unitMilliseconds);

  return {
    total,
    remaining: remaining - (total * unitMilliseconds)
  }
}

const calcHours = calcTime(MillisecondsInHour);
const calcMinutes = calcTime(MillisecondsInMinute);
const calcSeconds = calcTime(MillisecondsInSecond);

export default class StopwatchContainer extends Component<{}, StopWatchState> {
  private timerHandle?: number;

  public state: Readonly<StopWatchState> = {
    isRunning: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    totalElapsedMilliseconds: 0,
    currentElapsedMilliseconds: 0
  };

  componentWillUnmount(): void {
    // show with and without cleanup
    clearTimeout(this.timerHandle);
  }

  render() {
    return (
      <div>
        <h1>Hewwo! stopwatch!</h1>

        <StopwatchDigits 
          hours={this.state.hours} 
          minutes={this.state.minutes} 
          seconds={this.state.seconds}
          milliseconds={this.state.milliseconds} />

        <button onClick={this.toggle}>{this.state.isRunning ? "Stop" : "Start"}</button>
      </div>
    )
  }

  private toggle = () => {
    // start or stop the timer
    this.setState(prev => ({
      isRunning: !prev.isRunning,
      lastMark: new Date()
    }), () => {
      if (!this.state.isRunning) {
        // we rollup the current into total 
        this.setState(prev => ({
          totalElapsedMilliseconds: prev.currentElapsedMilliseconds + prev.totalElapsedMilliseconds,
          currentElapsedMilliseconds: 0
        }));
      } else {
        this.onTick();
      }
    });
  }

  private onTick(lastMark?: Date): void {
    if (!this.state.isRunning) {
      // if we are not running then the timer fired just before the user canceled 
      return;
    }

    const mark = lastMark || this.state.lastMark;
    this.updateElapsedTime(mark);

    this.timerHandle = window.setTimeout(() => {
      this.onTick(mark);
    }, 1000 / FramesPerSecond);
  }

  private updateElapsedTime(mark?: Date): void {
    if (!mark) {
      throw new Error("invalid state");
    }

    const now = new Date();
    const currentElapsed = now.getTime() - mark.getTime();
    const elapsed = currentElapsed + this.state.totalElapsedMilliseconds;

    const hourInfo = calcHours(elapsed);
    const minuteInfo = calcMinutes(hourInfo.remaining);
    const secondInfo = calcSeconds(minuteInfo.remaining);

    this.setState({
      hours: hourInfo.total,
      minutes: minuteInfo.total,
      seconds: secondInfo.total,
      milliseconds: secondInfo.remaining,
      currentElapsedMilliseconds: currentElapsed
    });
  }
}
