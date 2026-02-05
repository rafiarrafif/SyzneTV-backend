import { Prisma } from "@prisma/client";
import { AppError } from "../../../../helpers/error/instances/app";
import { episodeModel } from "../../episode.model";

export const updateEpisodeRepository = async (
  payload: Prisma.EpisodeUncheckedUpdateInput,
) => {
  try {
    return await episodeModel.update({
      where: {
        id: payload.id as string,
      },
      data: payload,
    });
  } catch (error) {
    throw new AppError(500, "Failed to edit episode", error);
  }
};
