import {
  JsonController,
  Get,
  HttpCode,
  Put,
  Param,
  Body,
  BadRequestError,
  NotFoundError
} from "routing-controllers";
import Game from "../entities/Game";
import Guess from "../entities/Guess";

interface ICheckGameStatus {
  hiddenNumber: number;
  guessAmount: number;
  guess: number;
}

@JsonController()
export default class UserController {
  @Get("/Game")
  @HttpCode(201)
  async createNewGame() {
    const hiddenNumber =
      Math.floor((Guess.max - Guess.min + 1) * Math.random()) + Guess.min;
    return (await Game.create({ hiddenNumber }).save()).id;
  }

  @Get("/Game/:id")
  async getGame(@Param("id") id: number) {
    return Game.findOne(id, { relations: ["guesses"] });
  }

  @Put("/Game/:id")
  async makeMove(@Param("id") id: number, @Body() { guess }) {
    guess = Number.parseInt(guess);
    const game = await getGameIfExists(id);
    console.log("player guessed", guess);
    if (game.won === true || game.won === false)
      throw new BadRequestError("This game was already finished");
    if (isValidGuess(guess)) {
      const [guesses, guessAmount] = await Guess.findAndCount({
        where: { game }
      });

      const guessAlreadyExists =
        guesses.filter(curr => curr.guess === (guess as number)).length !== 0;
      if (guessAlreadyExists) {
        throw new BadRequestError("That guess is already made");
      }

      const won = checkGameStatus({
        guess: guess!,
        guessAmount,
        hiddenNumber: game.hiddenNumber
      });

      const newGuessEntity = await Guess.create({ guess, game }).save();
      return Game.merge(game, {
        guesses: [...guesses, newGuessEntity],
        won
      }).save();
    }
  }
}

async function getGameIfExists(gameId: number): Promise<Game> {
  const game = await Game.findOne(gameId);
  if (!game) throw new NotFoundError();

  return game;
}

function isValidGuess(guess: number | undefined): boolean {
  if (!guess || typeof guess !== "number") {
    console.log(!guess, typeof guess !== "number");
    throw new BadRequestError("A valid guess was not provided");
  }

  console.log(guess, guess > Guess.max || guess < Guess.min);
  if (guess > Guess.max || guess < Guess.min)
    throw new BadRequestError("The guess was not inside the specified range");
  console.log("hi2");
  return true;
}

function checkGameStatus({
  hiddenNumber,
  guessAmount,
  guess
}: ICheckGameStatus): boolean | null {
  if (guessAmount === Game.maxGuesses - 1)
    return hiddenNumber === guess ? true : false;
  else return hiddenNumber === guess ? true : null;
}
