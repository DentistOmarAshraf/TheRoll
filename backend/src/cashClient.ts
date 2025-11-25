import Redis from "redis";

const redisClient = Redis.createClient(); // Production should add {uri:} in first param

redisClient.on("error", (error) => console.log(error));

export default redisClient;
