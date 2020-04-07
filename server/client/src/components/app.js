import React, { Component } from "react";
import ReactDOM from 'react-dom';


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
            gamestatus: null,
            teams: [],
            plays: [],
            bets: []
        };




        getGameStatus((err, gamestatus) => this.setState({
            gamestatus
        }))


        getTeams((err, teams) => this.setState({
            teams
        }))

        getNextPlay((err, play) => this.setState({
            plays: this.state.plays.concat(play)
        }))

        // this.updateBets = this.updateBets.bind(this)

    }
    
    updateBets(message) {
        console.log(message);
    }



    render() {

        return (

            <Container maxWidth="lg">
                <GameSummary teams={this.state.teams}
                score={this.state.plays[this.state.plays.length - 1]}/>
                <PlayLog lastPlay={this.state.plays[this.state.plays.length - 1]} />
                <BetTracker />
                <PlaceBet addBet = {this.updateBets} />
            </Container>

        )
    }
}

export default App


