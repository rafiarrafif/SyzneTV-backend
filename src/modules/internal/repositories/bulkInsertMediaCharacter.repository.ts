import {AppError} from "../../../helpers/error/instances/app";

export const bulkInsertMediaCharacterRepository = async (animeMalId: number) => {
    try {
        return animeMalId
    } catch (error) {
        throw new AppError(500, "Failed to bulk insert media characters", error);
    }
}