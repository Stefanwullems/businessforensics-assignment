import * as React from "react";
import createGame from "../../utils/requests/createGame";
import getGame from "src/utils/requests/getGame";
import GuessInput from "./GuessInput";
import makeMove from "src/utils/requests/makeMove";
import GameInfo from "./GameInfo";

interface IState {
  game: Game | null;
  minVal: number;
  maxVal: number;
  currentVal: number | null;
  maxGuesses: number;
  log: string;
  guessesMade: number[];
}

class GameContainer extends React.Component<{}, IState> {
  readonly state: IState = {
    game: null,
    minVal: 0,
    maxVal: 20,
    currentVal: null,
    maxGuesses: 3,
    log: "",
    guessesMade: []
  };

  async componentDidMount() {
    const gameId = await createGame();
    const game = await getGame(gameId);
    this.setState({ game });
  }

  handleChange(e) {
    const value: number = e.target.value;
    const newValue =
      (value >= this.state.minVal && value <= this.state.maxVal) || !value
        ? value
        : this.state.currentVal;

    this.setState({ currentVal: newValue });
  }

  async submitGuess(e) {
    e.preventDefault();
    const currGuess = this.state.currentVal;
    if (
      this.state.guessesMade.filter(guess => guess === currGuess).length === 0
    ) {
      this.state.guessesMade.push(currGuess);
      const game = await makeMove(this.state.game.id, currGuess);
      const log =
        game.won || game.won
          ? ""
          : `${this.state.currentVal} wasn't right. Try again`;
      this.setState({ game, log });
    } else {
      this.setState({ log: "You already made that guess" });
    }
  }

  render() {
    console.log(this.state.game);
    return (
      <React.Fragment>
        {!!this.state.game && (
          <GameInfo
            maxGuesses={this.state.maxGuesses}
            minVal={this.state.minVal}
            maxVal={this.state.maxVal}
            guessAmount={this.state.game.guesses.length}
            won={this.state.game.won}
            hiddenNumber={this.state.game.hiddenNumber}
            log={this.state.log}
          />
        )}
        {!!this.state.game &&
          (this.state.game.won !== null || this.state.game.won !== true) && (
            <GuessInput
              handleChange={this.handleChange.bind(this)}
              currentVal={this.state.currentVal}
              submitGuess={this.submitGuess.bind(this)}
            />
          )}
      </React.Fragment>
    );
  }
}

export default GameContainer;
