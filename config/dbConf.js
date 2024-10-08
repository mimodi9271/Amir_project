import 'dotenv/config';


const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password : process.env.PASSWORD,
    database: process.env.DATA_BASE,
}

export default dbConfig;