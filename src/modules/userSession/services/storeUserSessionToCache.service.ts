import { Prisma } from "@prisma/client";
import { storeUserSessionToCacheRepo } from "../repositories/storeUserSessionToCache.repository";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";

export const storeUserSessionToCacheService = async (
  userSession: Prisma.UserSessionUncheckedCreateInput,
  timeExpires: number
) => {
  try {
    // Store user session in cache with expiration time
    await storeUserSessionToCacheRepo(userSession, timeExpires);
    return;
  } catch (error) {
    // If any error occurs while storing session in cache, throw an AppError
    ErrorForwarder(error, 401, "Failed to store user session to cache");
  }
};
