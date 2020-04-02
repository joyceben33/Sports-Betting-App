import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container'
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"
import { subscribeToTimer } from './api';
import { getGameStatus } from './api2'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timestamp: 'no timestamp yet',
            gameStatus: {
                isStarted: null,
                isActive: null
            }
           
        };

        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));

        getGameStatus((err, gameStatus) => this.setState({
            
            gameStatus
        }))
    }
    render() {


        return (
            <Container maxWidth="lg">
                <div className="App">
                    <p className="App-intro">
                        The time is: {this.state.timestamp}
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


