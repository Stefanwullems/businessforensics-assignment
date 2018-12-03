import * as React from "react";

interface IProps {
  maxVal: number;
  minVal: number;
  guessAmount: number;
  maxGuesses: number;
  won: boolean | null;
  hiddenNumber: number;
  log: string;
}

function GameInfo(props: IProps) {
  const {
    minVal,
    maxVal,
    guessAmount,
    maxGuesses,
    won,
    hiddenNumber,
    log
  } = props;
  return (
    <div>
      <h1>Guess the number</h1>
      {won === null && (
        <p>
          Guess the right number between {minVal} and {maxVal} within{" "}
          {maxGuesses - guessAmount} turns
        </p>
      )}
      {won === true && (
        <p>
          Congratulations! You got it right after {guessAmount} try/tries. The
          number was indeed {hiddenNumber}.
        </p>
      )}
      {won === false && (
        <p>
          Too bad, you did not guess the number within {maxGuesses} tries. The
          number was {hiddenNumber}.
        </p>
      )}
      <p>{log}</p>
    </div>
  );
}

export default GameInfo;
