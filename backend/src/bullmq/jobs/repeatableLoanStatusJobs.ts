import { loanStatusQueue } from "../queues/loanStatus.queue.js";

export async function registerRepeatableJobs() {
  await loanStatusQueue.upsertJobScheduler(
    "daily-loan-sync",
    {
      pattern: "0 0 * * *",
    },
    {
      name: "sync-loans",
    },
  );
}
