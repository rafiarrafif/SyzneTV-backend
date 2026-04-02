import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const selectMediaBySlugRepository = async (slug: string) => {
  try {
    return await prisma.media.findUnique({
      where: { slug },
    });
  } catch (error) {
    throw new AppError(500, "Failed to fetch media by slug", error);
  }
};
