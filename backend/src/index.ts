import app from "./app.js";
import "dotenv/config";

import "./bullmq/workers/loanStatus.worker.js";
import { registerRepeatableJobs } from "./bullmq/jobs/repeatableLoanStatusJobs.js";

const PORT = process.env.PORT || 8080;

async function startServer() {
  await registerRepeatableJobs();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
