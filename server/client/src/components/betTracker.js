import React from 'react';
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

function createData(betType, betDesc, betStatus, wager, expReturn) {
  return { betType, betDesc, betStatus, wager, expReturn };
}

const rows = [
  createData('Line', "MIL +150", "Active", "$50", "+($20)" ),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BetTracker() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">Wager</TableCell>
            <TableCell align="right">Gain/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.play}>
              <TableCell component="th" scope="row">
                {row.betType}
              </TableCell>
              <TableCell align="right">{row.betDesc}</TableCell>
              <TableCell align="right">{row.betStatus}</TableCell>
              <TableCell align="right">{row.wager}</TableCell>
              <TableCell align="right">{row.expReturn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}