import {AppError} from "../../../helpers/error/instances/app";
import {prisma} from "../../../utils/databases/prisma/connection";

export const findMediaWithMalIdRepository = async (malId: number) => {
    try {
        return await prisma.media.findUnique({
            where: {
                mal_id: malId
            }
        });
    } catch (error) {
        throw new AppError(500, "Failed to find media with malId", error)
    }
};