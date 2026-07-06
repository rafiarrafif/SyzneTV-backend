import {MediaEpisodeInfoResponse} from "../../types/mediaEpisodeInfo.type";
import {AppError} from "../../../../helpers/error/instances/app";
import {SystemAccountId} from "../../../../config/account/system";
import {ErrorForwarder} from "../../../../helpers/error/instances/forwarder";
import {bulkInsertEpisodesRepository} from "../../repositories/bulkInsertEpisodes.repository";
import {getEpisodeReferenceAPI} from "../../../../config/apis/jikan/episode.reference";
import {findMediaWithMalIdRepository} from "../../repositories/findMediaWithMalId.repository";

export const bulkInsertEpisodeService = async (mal_id: number, page: number = 1) => {
    try {
        const episodeAPI = getEpisodeReferenceAPI(mal_id);
        const episodeData: MediaEpisodeInfoResponse = await fetch(
            `${episodeAPI.baseURL}${episodeAPI.getEpisodeList}?page=${page}`,
        ).then((res) => res.json()) as MediaEpisodeInfoResponse;

        const mediaData = await findMediaWithMalIdRepository(mal_id)
        if (!mediaData) throw new AppError(404, "Media not found");

        const constructedInput = episodeData.data.map(c => ({
            media_id: mediaData.id,
            episode_number: c.mal_id,
            title: c.title,
            title_romanji: c.title_romanji,
            title_origin: c.title_japanese,
            aired_at: c.aired,
            filler: c.filler,
            recap: c.recap,
            forum_url: c.forum_url,
            created_by_id: SystemAccountId
        }))
        const insertedEpisodes = await bulkInsertEpisodesRepository(constructedInput)
        return episodeData;
    } catch (err) {
        ErrorForwarder(err);
    }
};
