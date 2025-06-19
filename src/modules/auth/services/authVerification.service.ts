import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { checkUserSessionInCacheService } from "../../userSession/services/checkUserSessionInCache.service";
import { getUserSessionFromDBService } from "../../userSession/services/getUserSessionFromDB.service";
import { storeUserSessionToCacheService } from "../../userSession/services/storeUserSessionToCache.service";
import { JWTSessionPayload } from "../auth.types";

export const authVerificationService = async (cookie: string) => {
  try {
    // Decode the JWT token to get the session payload
    const jwtSession = jwtDecode(cookie) as JWTSessionPayload;

    // Check if the session exists in Redis
    const sessionCheckOnRedis = await checkUserSessionInCacheService(
      jwtSession.userId,
      jwtSession.id
    );

    if (!sessionCheckOnRedis) {
      // If not found in Redis, check the database
      const sessionCheckOnDB = await getUserSessionFromDBService(jwtSession.id);

      // If the session found in the database, store it in Redis. if not, throw an error
      if (!sessionCheckOnDB) {
        throw new AppError(401, "Session invalid or expired");
      } else {
        // Store the session in Redis with the remaining time until expiration
        const timeExpires = Math.floor(
          (new Date(sessionCheckOnDB.validUntil).getTime() -
            new Date().getTime()) /
            1000
        );
        await storeUserSessionToCacheService(sessionCheckOnDB, timeExpires);
        return sessionCheckOnDB;
      }
    } else {
      // If the session is found in Redis, return it
      return jwtSession;
    }
  } catch (error) {
    ErrorForwarder(error, 401, "Token is invalid");
  }
};
