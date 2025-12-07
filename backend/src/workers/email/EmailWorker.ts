import { Worker, Job } from "bullmq";
import { EMAIL_QUEUE_NAME, redisConfig } from "../redisConfig.js";
import emailServices from "../../services/EmailServices.js";

const myWorker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job: Job) => {
    console.log(`recived ${job.id} ${job.timestamp}`);
    try {
      switch (job.name) {
        case "confirm-mail": {
          console.log(`confirm works`);
          const { userEmail, userName, token } = job.data.user;
          await emailServices.sendConfirmEmail(userEmail, userName, token);
          break;
        }

        case "forget-pass": {
          console.log(`forget works`);
          const { userEmail, token } = job.data.user;
          await emailServices.sendForgetPassEmail(userEmail, token);
          break;
        }
      }
    } catch (err) {
      // next lines will be in future
      // I will develop logge
      // logger.error({
      //   message: "Email sending failed",
      //   error: err,
      //   payload,
      //   jobId: job.id,
      // });
      console.log(err);
      throw err;
    }
    return `success email`;
  },
  { connection: redisConfig }
);

myWorker.on("completed", (job: Job) => {
  console.log(`[Worker] Job ${job.id} completed! Result:`, job.returnvalue);
});

myWorker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed with error:`, err.message);
});

myWorker.on("ready", () => {
  console.log(`[Worker] Listening for jobs on queue: ${EMAIL_QUEUE_NAME}`);
});

myWorker.on("error", (err) => {
  // Handle errors from Redis connection itself
  console.error(`[Worker] Redis Error:`, err);
});
