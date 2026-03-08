import { SystemAccountId } from "../../../../config/account/system";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findEpisodeWithMediaIdRepository } from "../../repositories/findEpisodeWithMediaId.repository";
import { bulkInsertVideoRepository } from "../../repositories/bulkInsertVideo.repository";
import { Static } from "elysia";
import { bulkInsertVideoSchema } from "../../schemas/bulkInsertVideo.schema";

export const bulkInsertVideoService = async (body: Static<typeof bulkInsertVideoSchema.body>) => {
  try {
    const insertedVideos: string[] = [];
    for (const episodeData of body.data) {
      const episodeId = await findEpisodeWithMediaIdRepository({
        media: body.media_id,
        episode: episodeData.episode,
      });

      for (const videoData of episodeData.videos) {
        const insertedVideo = await bulkInsertVideoRepository({
          pendingUpload: false,
          episodeId: episodeId.id,
          serviceId: videoData.service_id,
          videoCode: videoData.video_code,
          thumbnailCode: videoData.thumbnail_code,
          uploadedBy: SystemAccountId,
        });

        insertedVideos.push(insertedVideo.id);
      }
    }

    return insertedVideos;
  } catch (error) {
    ErrorForwarder(error);
  }
};
