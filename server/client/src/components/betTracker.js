import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

// bet tracker
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// place bet
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Container from '@material-ui/core/Container';

// const useStyles = makeStyles((theme) => {
//   table: {
//     minWidth: 650
//   }
//   button: {
//     margin: theme.spacing(1)
//   }
// });




export default function BetTracker(props) {
  // const classes = useStyles();

  // place bet vars
  const [betType, setBetType] = React.useState('line');
  const [teamSelection, setTeamSelection] = React.useState('LAL');
  const [wager, setWager] = React.useState('50');

  // bet tracker vars
  const [placedBets] = React.useState([]);

  // place bet functions
  const handleBetType = (event) => {
    setBetType(event.target.value);
    console.log(event)
  };

  const handleTeamSelection = (event) => {
    setTeamSelection(event.target.value)
  }

  const handleWager = (event) => {
    setWager(event.target.value)
  }
  function addBet() {
    const selectedTeam = teamSelection;
    const betDesc = `${teamSelection} ${teamSelection === 'LAL' ? props.getLine().home : props.getLine().away}`;
    const betStatus = 'Active'
    const expRet = calcExpReturn(wager, selectedTeam);
    placedBets.push({ betType, selectedTeam, betDesc, betStatus, wager, expRet });
    console.log(placedBets)
  }

  // // bet tracker functions
  // function createData(betType, betDesc, betStatus, wager, expReturn) {
  //   return { betType, betDesc, betStatus, wager, expReturn };
  // }

  function calcExpReturn(wager, selectedTeam) {
    // const potentialPayout = Math.abs(props.getLine()) + wager
    // const expRet = (potentialPayout) - wager;
    // return expRet;
    const line = selectedTeam === 'LAL' ? props.getLine().home : props.getLine().away;
    const payoutLine = Math.abs(line);
    const favoriteSelected = line < 0;
    const expRet = favoriteSelected ? 100 / payoutLine * 100 : -wager;
    return Math.round(expRet, 2);
  }

  const expRetInterval = setInterval(() => {
    placedBets.forEach((bet) => {
      bet.expRet = calcExpReturn(bet.wager, bet.selectedTeam);
    })
  }, 3000)

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        {/* place bet */}
        <Box>
          <Box>
            <FormControl>
              <FormLabel style={{ textAlign: "left" }} component="legend">Bet Type</FormLabel>
              <RadioGroup aria-label="Bet Type" name="bet-type" value={betType} onChange={handleBetType}>
                <FormControlLabel value="line" control={<Radio />} label="Line" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel style={{ textAlign: "left" }} component="legend">Team</FormLabel>
              <RadioGroup style={{display: "block"}} aria-label="Choose A Team" name="team" value={teamSelection} onChange={handleTeamSelection}>
                <FormControlLabel  value="MIL" control={<Radio />} label="MIL" />
                <FormControlLabel  value="LAL" control={<Radio />} label="LAL" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl >
              <FormLabel style={{ textAlign: "left" }} component="legend">Place Bet</FormLabel>
              <RadioGroup style={{display: "block"}} aria-label="Wager" name="wager" value={wager} onChange={handleWager}>
                <FormControlLabel value="20" control={<Radio />} label="$20" />
                <FormControlLabel value="50" control={<Radio />} label="$50" />
                <FormControlLabel value="100" control={<Radio />} label="$100" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box style={{marginTop: "15px"}}>
            <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={() => { addBet() }}>
              Submit
            </Button>
          </Box>
        </Box>
        {/* bet tracker */}
        <TableContainer style={{ maxWidth: "900px" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Wager</TableCell>
                <TableCell align="right">Gain/Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {placedBets.map((bet, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="bet">
                    {bet.betType}
                  </TableCell>
                  <TableCell align="right">{bet.betDesc}</TableCell>
                  <TableCell align="right">{bet.betStatus}</TableCell>
                  <TableCell align="right">{bet.wager}</TableCell>
                  <TableCell align="right">${bet.expRet}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}