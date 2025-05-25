import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { storeUserSessionToCacheRepo } from "../repositories/storeUserSessionToCache.repository";

export const storeUserSessionToCacheService = async (
  userSession: Prisma.UserSessionUncheckedCreateInput,
  timeExpires: number
) => {
  try {
    await storeUserSessionToCacheRepo(userSession, timeExpires);
    return;
  } catch (error) {
    throw new AppError(401, "Failed to store user session to cache");
  }
};
