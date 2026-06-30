import {AppError} from "../../../helpers/error/instances/app";
import {MediaChar} from "../types/mediaCharacters";

export const bulkInsertMediaCharacterRepository = async (animeMalId: number, characters: MediaChar[]) => {
    try {
        return characters[0].character.name;
    } catch (error) {
        throw new AppError(500, "Failed to bulk insert media characters", error);
    }
}