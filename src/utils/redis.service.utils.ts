import { Redis } from "ioredis";

export const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    username: "default", // needs Redis >= 6
    password: "d22c7c930fc4667a8ccf01d55a4b412c",
    db: 0, // Defaults to 0
  });
  
  