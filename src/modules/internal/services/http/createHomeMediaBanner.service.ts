import { Static } from "elysia";
import { createHomeMediaBannerSchema } from "../../schemas/createHomeMediaBanner.schema";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findMediaWithMalIdRepository } from "../../repositories/findMediaWithMalId.repository";
import { AppError } from "../../../../helpers/error/instances/app";
import { insertNewHomeMediaBannerRepository } from "../../repositories/insertNewHomeMediaBanner.repository";

export const createHomeMediaBannerService = async (body: Static<typeof createHomeMediaBannerSchema.body>) => {
  try {
    const mediaData = await findMediaWithMalIdRepository(body.malId);
    if (!mediaData) throw new AppError(404, "The media with that MyAnimeList ID was not found in system");

    return await insertNewHomeMediaBannerRepository({
      mediaId: mediaData.id,
      startShow: body.startShow,
      endShow: body.endShow,
      priority: body.priority,
    });
  } catch (e) {
    ErrorForwarder(e, 500, "Failed when execute create home media banner service");
  }
};
