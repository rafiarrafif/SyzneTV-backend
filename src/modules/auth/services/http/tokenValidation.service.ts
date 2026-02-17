import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../../helpers/http/jwt/decode";
import { redis } from "../../../../utils/databases/redis/connection";
import { checkUserSessionInDBService } from "../../../userSession/services/internal/checkUserSessionInDB.service";

export const tokenValidationService = async (payload: string) => {
  try {
    if (!payload || payload.trim() === "")
      throw new AppError(401, "Unauthorized: No token provided");
    const decoded = jwtDecode(payload);

    const redisValidationResult = await redis.hgetall(
      `${process.env.APP_NAME}:users:${decoded.user.id}:sessions:${decoded.id}`,
    );
    if (
      !redisValidationResult ||
      Object.keys(redisValidationResult).length === 0
    ) {
      const dbValidationResult = await checkUserSessionInDBService(decoded.id);
      if (!dbValidationResult)
        throw new AppError(403, "Unauthorized: Invalid session");
      const createRedisKey = `${process.env.APP_NAME}:users:${decoded.user.id}:sessions:${decoded.id}`;
      await redis.hset(createRedisKey, {
        userId: decoded.user.id,
        sessionId: decoded.id,
        validUntil: decoded.validUntil,
      });
      await redis.expire(createRedisKey, Number(process.env.SESSION_EXPIRE));
    }

    return decoded;
  } catch (error) {
    ErrorForwarder(error);
  }
};
