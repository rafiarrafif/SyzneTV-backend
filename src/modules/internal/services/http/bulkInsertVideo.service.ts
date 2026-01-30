import { SystemAccountId } from "../../../../config/account/system";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { BulkInsertVideoBodyRequest } from "../../controllers/bulkInsertVideo.controller";
import { findEpisodeWithMediaIdRepository } from "../../repositories/findEpisodeWithMediaId.repository";
import { bulkInsertVideoRepository } from "../../repositories/bulkInsertVideo.repository";

export const bulkInsertVideoService = async (
  body: BulkInsertVideoBodyRequest,
) => {
  try {
    const insertedVideos: string[] = [];
    for (const episodeData of body.data) {
      const episodeId = await findEpisodeWithMediaIdRepository({
        media: body.media_id,
        episode: episodeData.episode,
      });

      for (const videoData of episodeData.videos) {
        const insertedVideo = await bulkInsertVideoRepository({
          episodeId: episodeId.id,
          serviceId: videoData.service_id,
          code: videoData.code,
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
