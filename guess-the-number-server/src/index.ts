import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import controllers from "./controllers";
import setupDb from "./db";

const port = process.env.PORT || 4000;

const app = createKoaServer({ controllers, cors: true });

setupDb();
app.listen(port, () => console.log(`Listening on port ${port}`));
