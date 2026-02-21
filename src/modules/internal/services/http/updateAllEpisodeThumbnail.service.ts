import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { getAllVideoServiceWithEpisodeRepository } from "../../../videoService/repositories/GET/getAllVideoServiceWithEpisode.repository";

export const updateAllEpisodeThumbnailService = async (
  serviceReferenceId?: string,
) => {
  try {
    if (!serviceReferenceId)
      throw new AppError(400, "Service Reference ID is required.");

    const videosData = await getAllVideoServiceWithEpisodeRepository(
      serviceReferenceId,
    );

    if (!videosData || videosData.length === 0)
      throw new AppError(
        404,
        "No episode with no thumbnail found in the specified video service.",
      );

    const updatePayload = videosData.map((videoService) => {
      const { endpointThumbnail, videos } = videoService;
      return videos
        .filter((video) => video.thumbnailCode !== null)
        .map((video) => ({
          episodeId: video.episode.id,
          thumbnailCode: endpointThumbnail?.replace(
            ":code:",
            video.thumbnailCode!,
          ),
        }));
    });

    return updatePayload;
  } catch (error) {
    ErrorForwarder(error);
  }
};
