import 'dotenv/config';

const redisConfig = {
    port: process.env.REDIS_PORT,
    host: process.env.REDID_HOST,
    maxRetriesPerRequest: null,
    enableReadyCheck: false
};

export default redisConfig;