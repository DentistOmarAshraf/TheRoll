import redisClient from "./cashClient.js";
import CasheServices from "./services/CacheServices.js";

(async () => {
  await redisClient.connect();
  const x = await CasheServices.deleteGroupKeys(
    "refres-token",
    "69557a8321accd3345085b43:*"
  );
  console.log(x);
  process.exit();
})();
