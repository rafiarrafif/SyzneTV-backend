import { AppError } from "../../../../helpers/error/instances/app";
import { mediaModel } from "../../model";

export const selectMediaIdFromSlugRepository = async (slug: string) => {
  try {
    return await mediaModel.findUnique({
      where: { slug },
      select: {
        id: true,
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to fetch media ID from slug.", error);
  }
};
