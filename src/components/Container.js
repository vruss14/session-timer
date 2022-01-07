import React from "react";

class Container extends React.Component {
    constructor(props) {
      super(props);

      this.timer = undefined;

      this.state = {
        breakLength: 5,
        sessionLength: 25,
        timerCount: 25 * 60,
        currentType: 'Session',
        timerStatus: 'Paused',
      }

      this.incrementValue = this.incrementValue.bind(this);
      this.decrementValue = this.decrementValue.bind(this);
      this.minutesAndSeconds = this.minutesAndSeconds.bind(this);
      this.handleStartAndStop = this.handleStartAndStop.bind(this);
    }

    incrementValue(type) {
        if(type === 1 && this.state.breakLength < 60 && this.state.currentType === 'Break') {
            this.setState({
                breakLength: this.state.breakLength + 1,
                timerCount: ((this.state.breakLength + 1) * 60)
            });
        } else if(type === 2 && this.state.sessionLength < 60 && this.state.currentType === 'Session') {
            this.setState({
                sessionLength: this.state.sessionLength + 1,
                timerCount: ((this.state.sessionLength + 1) * 60)
            });
        } else {
            return;
        }
    }

    decrementValue(type) {
        if(type === 1 && this.state.breakLength > 0 && this.state.currentType === 'Break') {
            this.setState({
                breakLength: this.state.breakLength - 1,
                timerCount: ((this.state.breakLength - 1) * 60)
            });        
        } else if(type === 2 && this.state.sessionLength > 0 && this.state.currentType === 'Session') {
            this.setState({
                sessionLength: this.state.sessionLength - 1,
                timerCount: ((this.state.sessionLength - 1) * 60)
            });        
        } else {
            return;
        }
    }

    minutesAndSeconds(count) {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;

        if(seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${minutes}:${seconds}`;
    }

    handleStartAndStop() {
        if(this.state.timerStatus === 'Active') {
            clearInterval(this.timer);
            this.setState({timerStatus: 'Paused'});
        } else {
            this.setState({timerStatus: 'Active'});
            this.timer = setInterval(() => {
                if(this.state.timerCount === 0) {
                    console.log(this.state);
                    this.setState({
                        currentType: this.state.currentType === 'Session' ? 'Break': 'Session',
                        timerCount: (this.state.currentType === 'Session') ? (this.state.breakLength * 60) : (this.state.sessionLength * 60)
                    })
                } else {
                    this.setState({
                        timerCount: this.state.timerCount - 1
                    })
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const rotated = {
            transform: `scaleY(-1)`
        }

        const smallMargins = {
            marginLeft: `2vw`,
            marginRight: `2vh`
        }
      return (
      <main className="container container-fluid d-flex min-vw-100 min-vh-100 justify-content-center align-items-center bg-dark">
          <div className="d-flex card p-5 text-center" id="timer-container">
                <div className="row p-5 d-flex justify-content-center">
                    <h1 className="fs-1 fw-light mb-5">25 + 5 Clock</h1>

                    <div className="fs-2 fw-light labels d-flex justify-content-between">
                        <div className="break-container">
                            <h2 id="break-label">Break Length</h2>

                            <div className="icons-container d-flex justify-content-evenly align-items-center">
                                <svg onClick={() => this.decrementValue(1)} id="break-decrement" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16" style={rotated}>
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                </svg>

                                <div className="d-flex justify-content-center align-items-center">
                                    <p id="break-length" className="mb-0">{this.state.breakLength}</p>
                                </div>

                                <svg onClick={() => this.incrementValue(1)} id="break-increment" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                </svg>
                            </div>


                        </div>

                        <div className="session-container">
                            <h2 id="session-label">Session Length</h2>

                            <div className="icons-container d-flex justify-content-evenly align-items-center">
                                <svg onClick={() => this.decrementValue(2)} id="session-decrement" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16" style={rotated}>
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                </svg>

                                <div className="d-flex justify-content-center align-items-center">
                                    <p id="session-length" className="mb-0">{this.state.sessionLength}</p>
                                </div>

                                <svg onClick={() => this.incrementValue(2)} id="session-increment" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                </svg>
                            </div>

                        </div>
                    </div>

                    <div className="timer border border-dark d-flex flex-column justify-content-center align-items-center text-center">
                        <h3 id="timer-label">{this.state.currentType}</h3>
                        <div id="time-left" className="current-time">{this.minutesAndSeconds(this.state.timerCount)}</div>
                    </div>

                    <div className="timer-controls d-flex pl-3 pr-3 justify-content-center">

                        {this.state.timerStatus === 'Paused' ?                         
                        <svg id="start_stop" onClick={this.handleStartAndStop} xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16" style={smallMargins}>
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                        </svg> :

                        <svg id="start_stop" onClick={this.handleStartAndStop} xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16" style={smallMargins}>
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
                        </svg>
                        }

                        <svg id="reset" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-alarm-fill" viewBox="0 0 16 16" style={smallMargins}>
                            <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"/>
                        </svg>

                    </div>

                </div>
          </div>
      </main>
      );
    }
};

export default Container;