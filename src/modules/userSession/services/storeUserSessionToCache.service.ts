import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { storeUserSessionToCacheRepo } from "../repositories/storeUserSessionToCache.repository";

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
    throw new AppError(401, "Failed to store user session to cache");
  }
};
