import {Prisma} from "@prisma/client";
import {AppError} from "../../../helpers/error/instances/app";
import {prisma} from "../../../utils/databases/prisma/connection";

export const bulkInsertVideoRepository = async (
    payload: Prisma.VideoCreateManyInput[],
) => {
    try {
        return await prisma.video.createMany({
            data: payload,
        });
    } catch (error) {
        throw new AppError(500, "Error inserting video", error);
    }
};
