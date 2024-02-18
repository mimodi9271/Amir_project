import express from "express"
const app = express();
import home from "./Route/home.js";
import { databaseConnection_func } from "./Queries/databaseConnection.js";
import 'dotenv/config';
import bullBoard_func from "./Bull/BullBoard.js";


databaseConnection_func();
console.log("test")

const serverAdapter = bullBoard_func()

app.use('/admin/queues', serverAdapter.getRouter());
app.use(express.json())
app.use( "/" , home );


app.listen(process.env.PORT , () => console.log(`app is listening on port ${process.env.PORT}`))





