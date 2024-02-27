import 'dotenv/config';


const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password : "",
    database: process.env.DATA_BASE,
}

export default dbConfig;