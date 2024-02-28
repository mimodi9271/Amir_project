import express from "express"
const app = express();
import home from "./routes/home.js";
import databaseConnection from "./db/databaseConnection.js";
import 'dotenv/config';
import initializeBullBoard from "./initialize/initializeBullBoard.js";
import initializeRedis from "./initialize/initializeRedis.js";
import { initializeRouter } from "./routes/home.js";



databaseConnection();


initializeBullBoard(app);
const redisConnection = initializeRedis();

app.use(express.json())
initializeRouter(redisConnection)
app.use( "/" , home )


app.listen(process.env.PORT , () => console.log(`app is listening on port ${process.env.PORT}`))





