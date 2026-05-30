import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { InsertMediaRepository } from "../../repositories/bulkinsertMedia.repository";
import { MediaFullInfoResponse } from "../../types/mediaFullInfo.type";
import { getContentReferenceAPI } from "../../../../config/apis/jikan/media.reference";

export const bulkInsertAnimeService = async (malId: number) => {
  try {
    const { baseURL, getMediaFullInfo } = getContentReferenceAPI(malId);
    const mediaFullInfo = (await fetch(baseURL + getMediaFullInfo).then((res) => res.json())) as MediaFullInfoResponse;

    const insertedMedia = await InsertMediaRepository({
      payload: mediaFullInfo.data,
    });

    return insertedMedia;
  } catch (error) {
    ErrorForwarder(error);
  }
};
