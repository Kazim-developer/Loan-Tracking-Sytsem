import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

export const loanStatusQueue = new Queue("loan-status", {
  connection,
});
