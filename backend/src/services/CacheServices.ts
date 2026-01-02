import redisClient from "../cashClient.js";

export default class CasheServices {
  static async setData(
    type: string,
    key: string,
    value: string,
    expired?: number
  ) {
    let dt;
    if (typeof expired === "number") {
      dt = await redisClient.set(`${type}:${key}`, value, {
        EX: 60 * expired,
      });
    } else {
      dt = await redisClient.set(`${type}:${key}`, value);
    }
    return dt;
  }

  static async deleteKey(type: string, key: string) {
    return await redisClient.del(`${type}:${key}`);
  }

  static async getData(type: string, key: string) {
    return await redisClient.get(`${type}:${key}`);
  }

  static async deleteGroupKeys(type: string, pattern: string) {
    let cursor = "0";
    let deleted = 0;
    do {
      const res = await redisClient.scan(cursor, {
        MATCH: `${type}:${pattern}`,
        COUNT: 100,
      });
      cursor = res.cursor;
      const keys = res.keys;
      if (keys.length > 0) {
        deleted += keys.length;
        await redisClient.unlink(keys);
      }
    } while (cursor !== "0");
    return deleted;
  }
}
