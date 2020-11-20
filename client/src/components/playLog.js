import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function createData(play, score, winProbability) {
  return { play, score, winProbability };
}


let rows = [];

export default class PlayLog extends Component{
  constructor(props){
    super(props)
    this.state = {
      lastPlay: {play: {text: 'jkdsnfnsf'}}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({lastPlay: nextProps.lastPlay});
    if(nextProps.lastPlay) {
      rows = (() => {
        let updatedRows = rows;
        updatedRows.unshift(createData( nextProps.lastPlay && nextProps.lastPlay.play.text, `${nextProps.lastPlay && nextProps.lastPlay.play.awayScore} - ${nextProps.lastPlay && nextProps.lastPlay.play.homeScore} `, nextProps.lastPlay && nextProps.lastPlay.homeWinPercentage));
        updatedRows = updatedRows.slice(0, 5);
        return updatedRows;
      })();
    }
    // rows.push(createData( nextProps.lastPlay && nextProps.lastPlay.play.text, `${nextProps.lastPlay && nextProps.lastPlay.play.awayScore} - ${nextProps.lastPlay && nextProps.lastPlay.play.homeScore} `, nextProps.lastPlay && nextProps.lastPlay.homeWinPercentage));
    // rows.push(createData('play', 'score', 'percent'));
    // console.log(nextProps.lastPlay)
}
 

  render() {

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Play Description</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Home Win Probability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.play}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.winProbability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}