import mysql from "mysql2";
import 'dotenv/config';
import dbConfig from "../Config/dbConf.js";


export const databaseConnection = () => {
    mysql.createPool(dbConfig).promise()
}


export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password : "",
    database: process.env.DATA_BASE,
  }).promise()
