import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const bulkInsertVideoRepository = async (
  payload: Omit<Prisma.VideoUncheckedCreateInput, "id">,
) => {
  try {
    return await prisma.video.upsert({
      where: {
        serviceId_videoCode: {
          serviceId: payload.serviceId,
          videoCode: payload.videoCode,
        },
      },
      create: {
        id: generateUUIDv7(),
        ...payload,
      },
      update: payload,
    });
  } catch (error) {
    throw new AppError(500, "Error inserting video", error);
  }
};
