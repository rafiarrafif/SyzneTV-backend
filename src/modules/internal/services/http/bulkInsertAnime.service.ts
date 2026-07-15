import {ErrorForwarder} from "../../../../helpers/error/instances/forwarder";
import {InsertMediaRepository} from "../../repositories/bulkinsertMedia.repository";
import {getContentReferenceAPI} from "../../../../config/apis/jikan/media.reference";
import {bulkInsertMediaCharacterRepository} from "../../repositories/bulkInsertMediaCharacter.repository";
import {bulkInsertMediaGenreRepository} from "../../repositories/bulkInsertMediaGenre.repository";
import {MediaFullInfoResponse} from "../../types/mediaFullInfo.type";
import {MediaCharacters} from "../../types/mediaCharacters";
import {AppError} from "../../../../helpers/error/instances/app";

export const bulkInsertAnimeService = async (malId: number) => {
    try {
        const {baseURL, getMediaFullInfo, getMediaCharacters} = getContentReferenceAPI(malId);
        const mediaFullInfo = (await fetch(baseURL + getMediaFullInfo).then((res) => res.json())) as MediaFullInfoResponse;
        if (!mediaFullInfo.data) throw new AppError(500, "JikanAPI currently not available");

        // Inserting Media and Producers (Producer, Studio, Licensor)
        const insertedMedia = await InsertMediaRepository({
            payload: mediaFullInfo.data,
        });

        // Inserting Characters, Staff, and Voice Actors
        const mediaChar = await fetch(baseURL + getMediaCharacters).then((res) => res.json()) as MediaCharacters;
        await bulkInsertMediaCharacterRepository(insertedMedia.id, mediaChar.data);

        // Inserting Genres and Demographics
        await bulkInsertMediaGenreRepository(mediaFullInfo, insertedMedia.id)

        return insertedMedia.id;
    } catch (error) {
        ErrorForwarder(error);
    }
};
