import redisConfig from "../config/redisConf.js";
import Redis from "ioredis";

const initializeRedis = () => {
  const redisConnection = new Redis(redisConfig);
  
  return redisConnection;
}

export default initializeRedis;
