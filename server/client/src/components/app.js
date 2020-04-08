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

            <Container maxWidth="lg">
                <AppBar position="sticky">
                    <Toolbar variant="dense">
                        <Typography className="text-align-center" variant="h3" color="inherit">
                            <SportsBasketballIcon fontSize="large" />
                                Courtside Gamble
                        </Typography>
                    </Toolbar>
                </AppBar>

                <GameSummary teams={this.state.teams}
                    score={this.state.plays[this.state.plays.length - 1]} />
                {/* <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label='Current Line' />
                    <TextField id="standard-basic" label='Away:' />
                    <TextField id="standard-basic" label={this.state.line ? this.state.line.away.toString() : "Not Available"} />
                    <TextField id="standard-basic" label='Home:' />
                    <TextField id="standard-basic" label={this.state.line ? this.state.line.home.toString() : "Not Available"} />
                </form> */}
                <Card variant="outlined">
                    <CardContent>
                        <Typography gutterBottom>
                            Current Line
                        </Typography>
                        <Typography gutterBottom>
                            Away: {this.state.line ? this.state.line.away.toString() : "Not Available"}
                        </Typography>
                        <Typography gutterBottom>
                            Home: {this.state.line ? this.state.line.home.toString() : "Not Available"}
                        </Typography>
                    </CardContent>
                </Card>
                <PlayLog lastPlay={this.state.plays.length > 0 && this.state.plays[this.state.plays.length - 1]} />
                <BetTracker line={this.state.line} getLine={this.getLine} />
            </Container>

        )
    }
}

export default App


