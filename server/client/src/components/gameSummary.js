import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));





class GameSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            score: null,
        }
        

    }

    componentWillReceiveProps(nextProps) {
        this.setState({teams: nextProps.teams, score: nextProps.score})
    }

    render() {
        
        return (
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant="h3" gutterBottom >
                        <Avatar alt="" src={this.state.teams.length > 0 && this.state.teams[0].logoURL} />
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {this.state.teams.length > 0 && this.state.teams[0].teamName}
                </Typography>
                    <Typography variant="body1" gutterBottom>
                        ({this.state.teams.length > 0 && this.state.teams[0].wins} - {this.state.teams.length > 0 && this.state.teams[0].losses})
                </Typography>
                </Box>
                <Box>
                    <Typography variant="h1" gutterBottom>
                        {this.state.score  ? this.state.score.play.awayScore : 0} - {this.state.score  ? this.state.score.play.homeScore : 0}
                </Typography>
                </Box>
                <Box>
                    <Typography variant="h3" gutterBottom>
                    <Avatar alt="" src={this.state.teams.length > 0 && this.state.teams[1].logoURL} />
                </Typography>
                    <Typography variant="h5" gutterBottom>
                    {this.state.teams.length > 0 && this.state.teams[1].teamName}
                </Typography>
                    <Typography variant="body1" gutterBottom>
                    ({this.state.teams.length > 0 && this.state.teams[1].wins} - {this.state.teams.length > 0 && this.state.teams[1].losses})
                </Typography>
                </Box>
            </Box>
        );

    }


}
export default GameSummary