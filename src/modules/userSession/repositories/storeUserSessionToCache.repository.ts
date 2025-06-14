import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { redis } from "../../../utils/databases/redis/connection";

export const storeUserSessionToCacheRepo = async (
  userSession: Prisma.UserSessionUncheckedCreateInput,
  timeExpires: number
) => {
  try {
    await redis.set(
      `${process.env.app_name}:users:${userSession.userId}:sessions:${userSession.id}`,
      String(userSession.validUntil),
      "EX",
      timeExpires
    );
  } catch (error) {
    throw new AppError(401, "Failed to store user session to cache");
  }
};
