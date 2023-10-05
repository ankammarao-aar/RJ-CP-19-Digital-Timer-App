// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTrue: false, minutes: 25, seconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickUpdate = () => {
    const {isTrue, minutes, seconds} = this.state

    const timeCompleted = seconds === minutes * 60

    if (timeCompleted) {
      this.setState({seconds: 0})
    }
    if (isTrue) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementInSeconds, 1000)
    }
    this.setState(prevState => ({isTrue: !prevState.isTrue}))
  }

  incrementInSeconds = () => {
    const {minutes, seconds} = this.state
    const timeCompleted = seconds === minutes * 60

    if (timeCompleted) {
      this.clearTimerInterval()
      this.setState({isTrue: false})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState({
      isTrue: false,
      minutes: 25,
      seconds: 0,
    })
  }

  onClickMinus = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes - 1,
    }))
  }

  onClickPlus = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
    }))
  }

  getRunningTimer = () => {
    const {minutes, seconds} = this.state
    const totalRunningSeconds = minutes * 60 - seconds

    const isMinutes = Math.floor(totalRunningSeconds / 60)
    const isSeconds = Math.floor(totalRunningSeconds % 60)

    const stringifiedMinutes = isMinutes > 9 ? isMinutes : `0${isMinutes}`
    const stringifiedSeconds = isSeconds > 9 ? isSeconds : `0${isSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTrue, minutes, seconds} = this.state
    const isDisabled = seconds > 0

    const playIconChange = isTrue
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const changeAlt = isTrue ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>

        <div className="time-container">
          <div className="card">
            <div className="bg-white">
              <h1 className="clack-time">{this.getRunningTimer()}</h1>
              <p className="pause">{isTrue ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div>
            <div className="start-reset-buttons-container">
              <button
                type="button"
                className="start-button"
                onClick={this.onClickUpdate}
              >
                <img
                  src={playIconChange}
                  alt={changeAlt}
                  className="play-image"
                />
                {isTrue ? 'Pause' : 'Start'}
              </button>
              <button
                type="button"
                className="start-button"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                  className="play-image"
                />
                Reset
              </button>
            </div>

            <div className="set-timer-limit-card">
              <p className="set-timer">Set Timer limit</p>
              <div className="plus-minus-buttons-container">
                <button
                  type="button"
                  className="minus"
                  disabled={isDisabled}
                  onClick={this.onClickMinus}
                >
                  -
                </button>
                <p className="number">{minutes}</p>
                <button
                  type="button"
                  className="minus"
                  disabled={isDisabled}
                  onClick={this.onClickPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
