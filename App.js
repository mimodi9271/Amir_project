import express from "express"
const app = express();
import home from "./Routes/home.js";
import { databaseConnection } from "./DB/databaseConnection.js";
import 'dotenv/config';
import setupBullBoard from "./Bull/BullBoard.js";



databaseConnection();


setupBullBoard(app)

app.use(express.json())
app.use( "/" , home );


app.listen(process.env.PORT , () => console.log(`app is listening on port ${process.env.PORT}`))





