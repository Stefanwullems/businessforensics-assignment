import * as request from "superagent";

async function createGame(): Promise<number> {
  const { body } = await request.get("http://localhost:4000/Game");

  return body;
}

export default createGame;
