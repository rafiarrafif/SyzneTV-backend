import { AppError } from "../../../helpers/error/instances/app";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { prisma } from "../../../utils/databases/prisma/connection";
import { redis } from "../../../utils/databases/redis/connection";
import { storeUserSessionToCacheRepo } from "../../userSession/repositories/storeUserSessionToCache.repository";
import { storeUserSessionToCacheService } from "../../userSession/services/storeUserSessionToCache.service";
import { JWTSessionPayload } from "../auth.types";

export const authVerificationService = async (cookie: string) => {
  try {
    // Decode the JWT token to get the session payload
    const jwtSession = jwtDecode(cookie) as JWTSessionPayload;

    // Check if the session exists in Redis
    const sessionCheckOnRedis = await redis.exists(jwtSession.id);
    if (!sessionCheckOnRedis) {
      // If not found in Redis, check the database
      const sessionCheckOnDB = await prisma.userSession.findUnique({
        where: {
          id: jwtSession.id,
        },
      });

      // If the session found in the database, store it in Redis. if not, throw an error
      if (
        !sessionCheckOnDB ||
        !sessionCheckOnDB.isAuthenticated ||
        new Date(sessionCheckOnDB.validUntil) < new Date()
      ) {
        throw new AppError(401, "Session invalid or expired");
      } else {
        // Store the session in Redis with the remaining time until expiration
        const timeExpires = Math.floor(
          (new Date(sessionCheckOnDB.validUntil).getTime() -
            new Date().getTime()) /
            1000
        );
        await storeUserSessionToCacheService(sessionCheckOnDB!, timeExpires);
        return sessionCheckOnDB;
      }
    } else {
      return jwtSession;
    }
  } catch (error) {
    throw new AppError(401, "Token is invalid", error);
  }
};
