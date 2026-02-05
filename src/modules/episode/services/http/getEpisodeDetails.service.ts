import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { getMediaIdFromSlugRepository } from "../../../media/repositories/GET/getMediaIdFromSlug.repository";
import { GetEpisodeDetailsParams } from "../../controllers/getEpisodeDetails.controller";
import { getEpisodeDetailsRepository } from "../../repositories/GET/getEpisodeDetails.repository";

export const getEpisodeDetailsService = async (
  params: GetEpisodeDetailsParams,
) => {
  try {
    if (!params.mediaSlug || !params.episode)
      throw new AppError(400, "Media slug and episode are required.");

    const mediaId = await getMediaIdFromSlugRepository(params.mediaSlug);
    if (!mediaId?.id) throw new AppError(404, "Media not found.");

    const result = await getEpisodeDetailsRepository({
      mediaId: mediaId.id,
      episode: Number(params.episode),
    });
    if (!result) throw new AppError(404, "Episode not found.");

    return result;
  } catch (error) {
    ErrorForwarder(error);
  }
};
