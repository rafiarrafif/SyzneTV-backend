import { AppError } from "../../../helpers/error/instances/app";
import { redis } from "../../../utils/databases/redis/connection";

export const checkUserSessionInCacheRepo = async (redisKeyName: string) => {
  try {
    const userSessionInRedis = await redis.exists(redisKeyName);
    if (!userSessionInRedis) return false;

    return userSessionInRedis;
  } catch (error) {
    throw new AppError(500, "Server cache error");
  }
};
