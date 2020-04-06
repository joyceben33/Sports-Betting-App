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
import { subscribeToTimer, getGameStatus, getTeams, getNextPlay } from './api';


class App extends Component {
    constructor() {
        super()

        this.state = {
            timestamp: 'no timestamp yet',
            gamestatus: {
                gameId: "",
                homeTeamId: "",
                awayTeamId: "",
                active: false,
                complete: false
            },
            teams: ['', ''],
            plays: []
        };



        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));

        getGameStatus((err, gamestatus) => this.setState({
            gamestatus
        }))


        getTeams((err, teams) => this.setState({
            teams
        }))

        getNextPlay((err, play) => this.setState({
            plays : this.state.plays.concat(play)
        }))


        // this.gamestatus = this.subscribeToTimer.bind(this)
    }



    render() {

        return (
            <Container maxWidth="lg">
                <div>
                    time: {this.state.timestamp}
                    homeId: {this.state.gamestatus.homeTeamId}
                    teams: {this.state.teams[0].city} + {this.state.teams[1].city}

                </div>
                {/* <GameSummary /> */}
                <PlayLog />
                {/* <BetTracker /> */}
                <PlaceBet />
            </Container>

        )
    }
}

export default App


