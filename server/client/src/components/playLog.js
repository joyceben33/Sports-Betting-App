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
    minWidth: 650,
  },
});

function createData(play, score, winProbability) {
  return { play, score, winProbability };
}

// const rows = [
//   createData({}, "13-0", "0.4"),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

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
    rows[0] = createData(nextProps.lastPlay.play.text, `${nextProps.lastPlay.play.awayScore} - ${nextProps.lastPlay.play.awayScore} `, nextProps.lastPlay.homeWinPercentage);
}
 

  render() {

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Play Description</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Win Probability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.play}>
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