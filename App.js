import express from "express"
const app = express();
import initializeDatabase from "./db/initializeDatabase.js";
import 'dotenv/config';
import initializeBullBoard from "./initialize/initializeBullBoard.js";
import initializeRedis from "./initialize/initializeRedis.js";
import { initializeRouter } from "./routes/home.js";


const pool = await initializeDatabase();



initializeBullBoard(app);
const redisConnection = initializeRedis();

const dependencies = {
    redisConnection ,
    app,
    pool
}

app.use(express.json())
initializeRouter(dependencies)


app.listen(process.env.PORT , () => console.log(`app is listening on port ${process.env.PORT}`))





