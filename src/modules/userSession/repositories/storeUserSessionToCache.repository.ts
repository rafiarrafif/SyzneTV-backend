import { Prisma } from "@prisma/client";
import { redis } from "../../../utils/databases/redis/connection";

export const storeUserSessionToCacheRepo = async (
  userSession: Prisma.UserSessionUncheckedCreateInput,
  timeExpires: number
) => {
  await redis.set(
    `${process.env.APP_NAME}:users:${userSession.userId}:sessions:${userSession.id}`,
    String(userSession.validUntil),
    "EX",
    timeExpires
  );
};
