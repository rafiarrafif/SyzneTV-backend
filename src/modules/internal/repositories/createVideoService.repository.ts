import {Prisma} from "@prisma/client";
import {AppError} from "../../../helpers/error/instances/app";
import {prisma} from "../../../utils/databases/prisma/connection";
import {generateUUIDv7} from "../../../helpers/databases/uuidv7";

export const createVideoServiceInternalRepository = async (
    payload: Prisma.VideoServiceCreateInput,
) => {
    try {
        return await prisma.videoService.upsert({
            where: {
                slug_resolution: {
                    slug: payload.name.toLowerCase(),
                    resolution: payload.resolution,
                }
            },
            create: payload,
            update: payload,
        });
    } catch (error) {
        throw new AppError(500, "Failed to create video service", error);
    }
};
