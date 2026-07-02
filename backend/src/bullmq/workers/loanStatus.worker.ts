import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis.js";
import { syncLoanStatuses } from "../../services/loanSync.service.js";

export const loanStatusWorker = new Worker(
  "loan-status",
  async () => {
    await syncLoanStatuses();
  },
  {
    connection: redisConnection,
  },
);
