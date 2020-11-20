import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export default function PlaceBet() {

  const classes = useStyles();
  const [betType, setBetType] = React.useState('line');
  const [teamSelection, setTeamSelection] = React.useState('LAL');
  const [wager, setWager] = React.useState('50');


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
  function sendBet() {
    this.props.addBet('bet was sent to parents')
  }

  return (

    <Container>
      <FormControl>
        <FormLabel component="legend">Bet Type</FormLabel>
        <RadioGroup aria-label="Bet Type" name="bet-type" value={betType} onChange={handleBetType}>
          <FormControlLabel value="line" control={<Radio />} label="Line" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel component="legend">Team (Home/Away)</FormLabel>
        <RadioGroup aria-label="Choose A Team" name="team" value={teamSelection} onChange={handleTeamSelection}>
          <FormControlLabel value="MIL" control={<Radio />} label="MIL" />
          <FormControlLabel value="LAL" control={<Radio />} label="LAL" />
        </RadioGroup>
      </FormControl>
      <FormControl >
        <FormLabel component="legend">Place Bet</FormLabel>
        <RadioGroup aria-label="Wager" name="wager" value={wager} onChange={handleWager}>
          <FormControlLabel value="20" control={<Radio />} label="$20" />
          <FormControlLabel value="50" control={<Radio />} label="$50" />
          <FormControlLabel value="100" control={<Radio />} label="$100" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          onClick={() => {sendBet()}}
        >
          Send
      </Button>
      </FormControl>
    </Container>


  );
}