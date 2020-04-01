import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container'
import socketIOClient from "socket.io-client";
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"


class App extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "localhost:5000",
            color: "white"
        }

    }
    render() {
       

        return (
          <Container maxWidth="lg">
             <GameSummary />
             <PlayLog />
             <BetTracker />
             <PlaceBet />
          </Container>
        )
    }
}

export default App


