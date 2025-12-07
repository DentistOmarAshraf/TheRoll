// config must be in .env
// it will be there in production inshallah
export const redisConfig = {
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
  // here I will add auth for redis
};

export const EMAIL_QUEUE_NAME = "email-queue";
