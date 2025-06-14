import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { checkUserSessionInCacheRepo } from "../repositories/checkUserSessionInCache.repository";

export const checkUserSessionInCacheService = async (
  userId: string,
  sessionId: string
) => {
  try {
    // Construct the Redis key name using the userId and sessionId
    const redisKeyName = `${process.env.app_name}:users:${userId}:sessions:${sessionId}`;

    // Check if the user session exists in Redis
    const userSessionInRedis = await checkUserSessionInCacheRepo(redisKeyName);
    return userSessionInRedis;
  } catch (error) {
    // Forward the error with a 400 status code and a message
    ErrorForwarder(error, 400, "Bad Request");
  }
};
