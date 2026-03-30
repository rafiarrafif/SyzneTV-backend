import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { tokenValidationService } from "../../auth/services/http/tokenValidation.service";
import { findSystemPreferenceService } from "../../systemPreference/services/internal/findSystemPreference.service";
import { findAllActiveHeroBannerRepository } from "../repositories/GET/findAllActiveHeroBanner.repository";

export const getActiveHeroBannerService = async ({ cookie }: { cookie?: string }) => {
  try {
    const userId = cookie ? (await tokenValidationService(cookie)).user.id : undefined;

    // Check if Hero Banner is enabled in system preferences
    const isHeroBannerEnabled = await findSystemPreferenceService("HERO_BANNER_ENABLED", "boolean");
    if (!isHeroBannerEnabled) throw new AppError(403, "Hero Banner is disabled");

    // Don’t implement caching just yet; implement collection caching first, then implement banner caching.
    // Please note that currently, a database query is still required to check the collections.
    // // Try to get active banners from Redis cache
    // const cachedBanners = await redis.get(`${redisKey.filter((key) => key.name === "HERO_BANNER")[0].key}`);
    // if (cachedBanners) return JSON.parse(cachedBanners);

    // If not in cache, fetch from database and cache the result
    const activeBanners = await findAllActiveHeroBannerRepository(userId);
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
      isInCollection: banner.media._count.inCollections > 0,
    }));

    // await redis.set(
    //   `${redisKey.filter((key) => key.name === "HERO_BANNER")[0].key}`,
    //   JSON.stringify(constructedBanners),
    // );

    return constructedBanners;
  } catch (error) {
    ErrorForwarder(error);
  }
};
