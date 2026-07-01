import { Worker } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

const loanStatusUpdate = new Worker("loan-status", async (job) => {}, {
  connection,
});
