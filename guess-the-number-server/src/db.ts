import { createConnection } from "typeorm";
import entities from "./entities";

export default () =>
  createConnection({
    type: "postgres",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:password@localhost:5432/test",
    entities,
    synchronize: true,
    logging: true
  })
    .then(_ => console.log("Connected to Postgres with TypeORM"))
    .catch(console.error);
