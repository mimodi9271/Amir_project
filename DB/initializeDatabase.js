import mysql from "mysql2";
import 'dotenv/config';
import dbConfig from "../config/dbConf.js";


const initializeDatabase = async () => {
   return mysql.createPool(dbConfig).promise();
   
}



export default initializeDatabase;
