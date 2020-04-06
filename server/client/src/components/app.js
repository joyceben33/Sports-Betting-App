import React, { Component } from "react";
import ReactDOM from 'react-dom';
// import {connect} from 'react-redux'
// import {loadinitialGameStatusSocket} from '../actions/action'
import io from "socket.io-client"

//Material UI
import Container from '@material-ui/core/Container'
// Import Components
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"
import { subscribeToTimer } from './api';


class App extends Component {
    constructor() {
        super()
        
        this.state = {
              timestamp: 'no timestamp yet'
        };

        subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp 
        }));

        // this.subscribeToTimer = this.subscribeToTimer.bind(this)
    }

    

    

    render() {

        return (
            <Container maxWidth="lg">
                <div>
                    time: {this.state.timestamp}
                </div>
                <GameSummary subscribeToTimer={this.subscribeToTimer} />
                <PlayLog />
                <BetTracker />
                <PlaceBet />
            </Container>
        )
    }
}

export default App


