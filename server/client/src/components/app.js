import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container'
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:5000');
import { subscribeToTimer } from './api';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timestamp: 'no timestamp yet'
        };

        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));

    }
    render() {


        return (
            <Container maxWidth="lg">
                <div className="App">
                    <p className="App-intro">
                        This is the timer value: {this.state.timestamp}
                    </p>
                </div>
                <GameSummary />
                <PlayLog />
                <BetTracker />
                <PlaceBet />
            </Container>
        )
    }
}

export default App


