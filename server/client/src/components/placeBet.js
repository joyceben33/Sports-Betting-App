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
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">Bet Type</FormLabel>
        <RadioGroup aria-label="Bet Type" name="bet-type" value={value} onChange={handleChange}>
          <FormControlLabel value="line" control={<Radio />} label="Line" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Team (Home/Away)</FormLabel>
        <RadioGroup aria-label="Choose A Team" name="team" value={value} onChange={handleChange}>
          <FormControlLabel value="MIL" control={<Radio />} label="MIL" />
          <FormControlLabel value="LAL" control={<Radio />} label="LAL" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Place Bet</FormLabel>
        <RadioGroup aria-label="Wager" name="wager" value={value} onChange={handleChange}>
          <FormControlLabel value="20" control={<Radio />} label="$20" />
          <FormControlLabel value="50" control={<Radio />} label="$50" />
          <FormControlLabel value="100" control={<Radio />} label="$100" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Payout</FormLabel>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
        >
          Send
      </Button>
      </FormControl>
    </Container>


  );
}