import { AppError } from "../../../helpers/error/instances/app";
import { checkUserSessionInCacheRepo } from "../repositories/checkUserSessionInCache.repository";

export const checkUserSessionInCacheService = async (
  userId: string,
  sessionId: string
) => {
  const redisKeyName = `${process.env.app_name}:users:${userId}:sessions:${sessionId}`;
  try {
    const userSessionInRedis = await checkUserSessionInCacheRepo(redisKeyName);
    return userSessionInRedis;
  } catch {
    throw new AppError(502, "Server cache error");
  }
};
