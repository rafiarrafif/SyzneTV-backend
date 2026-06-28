import {ErrorForwarder} from "../../../../helpers/error/instances/forwarder";
import {InsertMediaRepository} from "../../repositories/bulkinsertMedia.repository";
import {getContentReferenceAPI} from "../../../../config/apis/jikan/media.reference";
import {MediaFullInfoResponse} from "../../types/mediaFullInfo.type";

export const bulkInsertAnimeService = async (malId: number) => {
  try {
    const { baseURL, getMediaFullInfo } = getContentReferenceAPI(malId);
    const mediaFullInfo = (await fetch(baseURL + getMediaFullInfo).then((res) => res.json())) as MediaFullInfoResponse;

    return await InsertMediaRepository({
      payload: mediaFullInfo.data,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
