import { AppError } from "../../../../helpers/error/instances/app";
import { redis } from "../../../../utils/databases/redis/connection";

export const createUserSessionInRedisService = async ({
  userId,
  sessionId,
  validUntil,
  exp,
}: {
  userId: string;
  sessionId: string;
  validUntil?: Date;
  exp?: number;
}) => {
  try {
    const createRedisKey = `${process.env.APP_NAME}:users:${userId}:sessions:${sessionId}`;
    await redis.hset(createRedisKey, {
      userId,
      sessionId,
      validUntil: validUntil,
    });
    await redis.expire(
      createRedisKey,
      exp || Number(process.env.SESSION_CACHE_EXPIRE!),
    );
    return true;
  } catch (error) {
    throw new AppError(500, "Error creating user session in Redis", error);
  }
};
