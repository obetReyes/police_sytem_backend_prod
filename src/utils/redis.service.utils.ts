import { Redis } from "ioredis";


export const redis = new Redis({
    port: parseInt(process.env.REDIS_PORT || "6379", 10), // Redis port
    host: process.env.REDIS_HOST ||  "127.0.0.1", // Redis host
    username: process.env.REDIS_USERNAME || "default", // needs Redis >= 6
    password: process.env.REDDIS_PASSWORD || "d22c7c930fc4667a8ccf01d55a4b412c",
    db: parseInt(process.env.REDIS_DB || "0", 10), // Defaults to 0
  });
  
  