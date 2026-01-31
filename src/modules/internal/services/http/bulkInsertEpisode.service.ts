import { getEpisodeReferenceAPI } from "../../../../config/apis/episode.reference";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { MediaEpisodeInfoResponse } from "../../types/mediaEpisodeInfo.type";
import { getMediaByMalIdRepository } from "../../../media/repositories/GET/getMediaByMalId.repository";
import { AppError } from "../../../../helpers/error/instances/app";
import { SystemAccountId } from "../../../../config/account/system";
import { bulkInsertEpisodesRepository } from "../../repositories/bulkInsertEpisodes.repository";

export const bulkInsertEpisodeService = async (
  mal_id: number,
  page: number = 1,
) => {
  try {
    const episodeAPI = getEpisodeReferenceAPI(mal_id);
    const episodeData: MediaEpisodeInfoResponse = await fetch(
      `${episodeAPI.baseURL}${episodeAPI.getEpisodeList}?page=${page}`,
    ).then((res) => res.json());

    const mediaData = await getMediaByMalIdRepository(mal_id);
    if (!mediaData)
      throw new AppError(
        404,
        `Media with Mal ID ${mal_id} not found in database`,
      );

    const insertedEpisodeData = [];
    episodeData.data.forEach(async (episode) => {
      insertedEpisodeData.push(
        await bulkInsertEpisodesRepository({
          mediaId: mediaData.id!,
          episode: episode.mal_id,
          name: episode.title,
          score: episode.score,
          uploadedBy: SystemAccountId,
        }),
      );
    });
    return episodeData;
  } catch (err) {
    ErrorForwarder(err);
  }
};
