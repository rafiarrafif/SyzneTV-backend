import { Prisma } from "@prisma/client";
import { UserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { createUserSessionRepository } from "../repositories/createUserSession.repository";
import { jwtEncode } from "../../../helpers/http/jwt/encode";
import { createUserSessionInRedisService } from "./internal/createUserSessionInRedis.service";

export const createUserSessionService = async (
  userId: string,
  userHeaderInfo: UserHeaderInformation,
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
    await createUserSessionInRedisService({
      userId,
      sessionId: createUserSession.id,
      validUntil: createUserSession.validUntil,
    });

    // create a jwt token with a payload containing the created user session, then return jwt
    return jwtEncode(createUserSession);
  } catch (error) {
    ErrorForwarder(error);
  }
};
