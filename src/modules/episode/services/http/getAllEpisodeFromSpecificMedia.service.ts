import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { getAllEpisodeFromMediaRepository } from "../../repositories/GET/getAllEpisodeFromMedia.repository";

export const getAllEpisodeFromSpecificMediaService = async (
  mediaSlug: string,
) => {
  try {
    const mediaData = await getAllEpisodeFromMediaRepository(mediaSlug);
    if (!mediaData)
      throw new AppError(404, `Media with slug ${mediaSlug} not found`);
    return mediaData.episodes;
  } catch (error) {
    ErrorForwarder(error);
  }
};
