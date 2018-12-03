interface Game {
  id: number;
  hiddenNumber: number;
  won: boolean | null;
  guesses: Guess[];
}

interface Guess {
  id: number;
  guess: number;
  game: Game;
}
