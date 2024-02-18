import mysql from "mysql2";
import 'dotenv/config';


export const databaseConnection_func = () => {
    mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password : "",
        database: process.env.DATA_BASE,
    }).promise()
}


export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password : "",
    database: process.env.DATA_BASE,
  }).promise()
