import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const createVideoServiceInternalRepository = async (
  payload: Omit<Prisma.VideoServiceUncheckedCreateInput, "id">,
) => {
  try {
    return await prisma.videoService.upsert({
      where: {
        name: payload.name,
      },
      create: {
        id: generateUUIDv7(),
        ...payload,
      },
      update: payload,
    });
  } catch (error) {
    throw new AppError(500, "Failed to create video service", error);
  }
};
