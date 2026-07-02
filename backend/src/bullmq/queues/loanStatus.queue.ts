import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis.js";

export const loanStatusQueue = new Queue("loan-status", {
  connection: redisConnection,
});
