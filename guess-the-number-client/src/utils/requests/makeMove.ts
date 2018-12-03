import * as request from "superagent";

async function makeMove(gameId: number, guess: number): Promise<Game> {
  try {
    const { body } = await request
      .put(`http://localhost:4000/Game/${gameId}`)
      .set("Content-Type", "application/json")
      .send({ guess });
    return body;
  } catch (error) {
    console.log(error.message);
  }
}

export default makeMove;
