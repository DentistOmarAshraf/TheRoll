import { Queue } from "bullmq";
import { redisConfig, EMAIL_QUEUE_NAME } from "./redisConfig.js";

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: redisConfig,
});
