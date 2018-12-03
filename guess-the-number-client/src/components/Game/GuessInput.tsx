import * as React from "react";
import { TextField, withStyles, Button } from "@material-ui/core";

interface IProps {
  handleChange: () => void;
  submitGuess: () => void;
  currentVal: number;
  classes: {
    [key: string]: any;
  };
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function GuessInput({
  handleChange,
  currentVal,
  classes,
  submitGuess
}: IProps) {
  return (
    <React.Fragment>
      <TextField
        id="standard-number"
        label="Number"
        value={currentVal}
        onChange={handleChange}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />
      <Button onClick={submitGuess}>Submit</Button>
    </React.Fragment>
  );
}

export default withStyles(styles)(GuessInput);
