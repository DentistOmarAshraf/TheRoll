import redisClient from "../cashClient.js";

export default class CashServices {
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

  static async getData(type: string, key: string) {
    return await redisClient.get(`${type}:${key}`);
  }
}
