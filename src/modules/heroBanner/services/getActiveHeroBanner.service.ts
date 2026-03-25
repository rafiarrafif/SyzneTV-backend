import { redisKey } from "../../../config/redis/key";
import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { redis } from "../../../utils/databases/redis/connection";
import { findSystemPreferenceService } from "../../systemPreference/services/internal/findSystemPreference.service";
import { findAllActiveHeroBannerRepository } from "../repositories/GET/findAllActiveHeroBanner.repository";

export const getActiveHeroBannerService = async () => {
  try {
    // Check if Hero Banner is enabled in system preferences
    const isHeroBannerEnabled = await findSystemPreferenceService("HERO_BANNER_ENABLED", "boolean");
    if (!isHeroBannerEnabled) throw new AppError(403, "Hero Banner is disabled");

    // Try to get active banners from Redis cache
    const cachedBanners = await redis.get(`${redisKey.filter((key) => key.name === "HERO_BANNER")[0].key}`);
    if (cachedBanners) return JSON.parse(cachedBanners);

    // If not in cache, fetch from database and cache the result
    const activeBanners = await findAllActiveHeroBannerRepository();
    const constructedBanners = activeBanners.map((banner) => ({
      id: banner.media.id,
      title: banner.media.title,
      slug: banner.media.slug,
      imageUrl: banner.imageUrl || banner.media.pictureLarge,
      synopsis: banner.media.synopsis,
      genres: banner.media.genres.map((genre) => ({
        slug: genre.slug,
        name: genre.name,
      })),
    }));
    await redis.set(
      `${redisKey.filter((key) => key.name === "HERO_BANNER")[0].key}`,
      JSON.stringify(constructedBanners),
    );
    return constructedBanners;
  } catch (error) {
    ErrorForwarder(error);
  }
};
