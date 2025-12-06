import Redis from "redis";

const redisClient = Redis.createClient(); // Production should add {uri:} in first param

redisClient.on("error", (error) => console.log(error));

process.on("SIGTERM", async () => {
  await redisClient.quit();
  process.exit(0);
});

export default redisClient;
