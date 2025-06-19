import { AppError } from "../../../helpers/error/instances/app";
import { redis } from "../../../utils/databases/redis/connection";

export const deleteUserSessionFromCacheRepo = async (
  userId: string,
  sessionId: string
) => {
  try {
    const deleteUserSessionFromCache = redis.del(
      `${process.env.APP_NAME}:users:${userId}:sessions:${sessionId}`
    );
    return deleteUserSessionFromCache;
  } catch (error) {
    throw new AppError(500, "Error while remove data from cache", error);
  }
};
