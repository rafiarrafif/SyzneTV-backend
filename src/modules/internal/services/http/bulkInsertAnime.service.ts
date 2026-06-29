import {ErrorForwarder} from "../../../../helpers/error/instances/forwarder";
import {InsertMediaRepository} from "../../repositories/bulkinsertMedia.repository";
import {getContentReferenceAPI} from "../../../../config/apis/jikan/media.reference";
import {bulkInsertMediaCharacterRepository} from "../../repositories/bulkInsertMediaCharacter.repository";
import {MediaFullInfoResponse} from "../../types/mediaFullInfo.type";
import {MediaCharacters} from "../../types/mediaCharacters";

export const bulkInsertAnimeService = async (malId: number) => {
    try {
        const {baseURL, getMediaFullInfo, getMediaCharacters} = getContentReferenceAPI(malId);
        const mediaFullInfo = (await fetch(baseURL + getMediaFullInfo).then((res) => res.json())) as MediaFullInfoResponse;

        const insertedMedia = await InsertMediaRepository({
            payload: mediaFullInfo.data,
        });


        // await bulkInsertMediaCharacterRepository(insertedMedia.mal_id)
        const mediaChar = await fetch(baseURL + getMediaCharacters).then((res) => res.json()) as MediaCharacters;
        return mediaChar;
    } catch (error) {
        ErrorForwarder(error);
    }
};
