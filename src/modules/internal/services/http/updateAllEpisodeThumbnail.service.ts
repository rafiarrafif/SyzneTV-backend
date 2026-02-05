import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { updateEpisodeRepository } from "../../../episode/repositories/PUT/updateEpisode.repository";
import { getAllEpisodeWithThumbnailLinkRepository } from "../../repositories/getAllEpisodeWithThumbnailLink.repository";

export const updateAllEpisodeThumbnailService = async (
  serviceReferenceId: string,
) => {
  try {
    if (!serviceReferenceId)
      throw new AppError(400, "Service Reference ID is required.");

    const episodesData = await getAllEpisodeWithThumbnailLinkRepository(
      serviceReferenceId,
    );
    console.log("episodesData", episodesData);

    let updatedThumbnailsCount = 0;
    for (const episode of episodesData) {
      if (episode.videos.length === 0) continue;
      await updateEpisodeRepository({
        id: episode.id,
        pictureThumbnail:
          episode.videos[0].service.endpointThumbnail?.replace(
            ":code:",
            episode.videos[0].code,
          ) || null,
      });

      updatedThumbnailsCount++;
    }

    return updatedThumbnailsCount;
  } catch (error) {
    ErrorForwarder(error);
  }
};
