import * as request from "superagent";

async function getGame(gameId: number): Promise<Game> {
  const { body } = await request.get(`http://localhost:4000/Game/${gameId}`);
  return body;
}

export default getGame;
