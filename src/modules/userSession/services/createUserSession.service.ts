import { Prisma } from "@prisma/client";
import { UserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { createUserSessionRepository } from "../repositories/createUserSession.repository";
import { redis } from "../../../utils/databases/redis/connection";
import { jwtEncode } from "../../../helpers/http/jwt/encode";

export const createUserSessionService = async (
  userId: string,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    // set the date when the token will expire
    const generateTokenExpirationDate =
      Date.now() + Number(process.env.SESSION_EXPIRE) * 1000;

    // construct all data to fit the user session input query
    const constructData = {
      userId,
      isAuthenticated: true,
      deviceType: userHeaderInfo.deviceType,
      deviceOs: userHeaderInfo.deviceOS,
      deviceIp: userHeaderInfo.ip,
      browser: userHeaderInfo.browser,
      validUntil: new Date(generateTokenExpirationDate),
    } as Prisma.UserSessionUncheckedCreateInput;

    // insert user session into database
    const createUserSession = await createUserSessionRepository(constructData);

    // caching user session data into Redis
    const createRedisKey = `${process.env.APP_NAME}:users:${userId}:sessions:${createUserSession.id}`;
    await redis.hset(createRedisKey, {
      userId,
      sessionId: createUserSession.id,
      validUntil: createUserSession.validUntil,
    });
    await redis.expire(createRedisKey, Number(process.env.SESSION_EXPIRE));

    // create a jwt token with a payload containing the created user session, then return jwt
    return jwtEncode(createUserSession);
  } catch (error) {
    ErrorForwarder(error);
  }
};
