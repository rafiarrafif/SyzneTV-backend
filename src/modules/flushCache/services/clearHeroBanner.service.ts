import { redisKey } from "../../../config/redis/key";
import { AppError } from "../../../helpers/error/instances/app";
import { redis } from "../../../utils/databases/redis/connection";

export const clearHeroBannerService = async () => {
  try {
    const cache = await redis.del(redisKey.find((key) => key.name === "HERO_BANNER")?.key || "");
    return cache > 0; // Returns true if cache was cleared, false if it was not found
  } catch (error) {
    throw new AppError(500, "Failed to clear hero banner cache", error);
  }
};
