import { RedisOptions, Redis } from "ioredis";

export const redisConnection: RedisOptions = {
  host: "localhost",
  port: 6379,
};

export const redis = new Redis();
