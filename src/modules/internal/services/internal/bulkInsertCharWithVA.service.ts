import { getContentReferenceAPI } from "../../../../config/apis/media.reference";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { MediaCharWithVAInfo } from "../../types/mediaCharWithVAInfo";

export const bulkInsertCharWithVAService = async (malId: number) => {
  try {
    const { baseURL, getMediaCharactersWithVA } = getContentReferenceAPI(malId);
    const charactersWithVAData = (await fetch(
      `${baseURL}${getMediaCharactersWithVA}`,
    ).then((res) => res.json())) as MediaCharWithVAInfo;

    return;
  } catch (error) {
    ErrorForwarder(error);
  }
};
