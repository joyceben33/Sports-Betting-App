import React, { Component } from "react";


//Material UI
import Container from '@material-ui/core/Container'
import { Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import Box from '@material-ui/core/Box'
// Import Components
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"
import { getGameStatus, getTeams, getNextPlay } from './api';


let useStyles


class App extends Component {
constructor() {
    super()

    this.state = {
        gamestatus: null,
        teams: [],
        plays: [],
        bets: [],
        line: null
    };

    //binding
    // this.getLine.getLine = () => {
    //     return this.state.line
    // }; 
    this.getLine = this.getLine.bind(this)


    getGameStatus((err, gamestatus) => this.setState({
        gamestatus
    }))


    getTeams((err, teams) => this.setState({
        teams
    }))

    getNextPlay((err, play) => this.setState({
        plays: this.state.plays.concat(play),
        line: this.updateLine(play)
    }))

    // this.getLine = this.getLine.bind(this)

}

getLine() {
    return this.state.line
}


//This function is passed down to betTracker component
updateLine(lastPlay) {

    const homeWinPercentage = lastPlay.homeWinPercentage || lastPlay[0].homeWinPercentage
    const awayWinPercentage = 1 - homeWinPercentage;

    //American Odds assumes a $100 wager amount
    const homeIsUnderdog = homeWinPercentage < 0.5;
    const useWinPercentage = homeIsUnderdog ? homeWinPercentage : awayWinPercentage;
    const wager = 100;
    const underdogLine = Math.round(parseFloat((wager / useWinPercentage) - wager));
    const line = {
        home: homeIsUnderdog ? underdogLine : -underdogLine,
        away: homeIsUnderdog ? -underdogLine : underdogLine
    };
    // console.log(`wager: ${wager} \n hwp: ${homeWinPercentage} \n wager/hwp: ${wager/homeWinPercentage} \n line: ${line}`);
    return line
}

useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



render() {

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar style={{textAlign: "center"}} variant="dense">
                    <Container>
                        <Typography variant="h3" color="inherit">
                            <SportsBasketballIcon fontSize="large" />
                            Courtside Gamble
                            
                    </Typography>


                    </Container>
                </Toolbar>

            </AppBar>

            <Container style={{ padding: "50px", backgroundColor: "#EEE" }} my="75px" maxWidth="lg">
                <GameSummary teams={this.state.teams}
                    score={this.state.plays[this.state.plays.length - 1]} />
                <Box style={{margin: "15px auto"}}>
                <PlayLog lastPlay={this.state.plays.length > 0 && this.state.plays[this.state.plays.length - 1]} />
                </Box>
                <Box>
                    <Box>
                        <Typography style={{ textAlign: "center" }} variant="h5" gutterBottom>
                            Current Line:
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                            Away: {this.state.line ? this.state.line.away.toString() : "Not Available"} /
                        </Typography>
                        <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                            &nbsp;Home: {this.state.line ? this.state.line.home.toString() : "Not Available"}
                        </Typography>
                    </Box>
                </Box>
                <BetTracker line={this.state.line} getLine={this.getLine} />
            </Container>
        </div>

    )
}
}

export default App


