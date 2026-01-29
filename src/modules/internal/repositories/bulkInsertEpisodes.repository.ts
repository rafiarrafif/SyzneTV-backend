import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const bulkInsertEpisodesRepository = async (
  payload: Omit<Prisma.EpisodeUncheckedCreateInput, "id">,
) => {
  try {
    return await prisma.episode.upsert({
      where: {
        mediaId_episode: {
          mediaId: payload.mediaId as string,
          episode: payload.episode as number,
        },
      },
      update: payload,
      create: {
        id: generateUUIDv7(),
        ...payload,
      },
    });
  } catch (err) {
    throw new AppError(500, "Failed to bulk insert episodes", err);
  }
};
