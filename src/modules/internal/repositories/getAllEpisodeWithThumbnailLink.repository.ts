import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const getAllEpisodeWithThumbnailLinkRepository = async (
  serviceReferenceId: string,
) => {
  try {
    return await prisma.episode.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        episode: true,
        videos: {
          where: {
            deletedAt: null,
            serviceId: serviceReferenceId,
          },
          select: {
            code: true,
            service: {
              select: {
                endpointThumbnail: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to update all episode thumbnails", error);
  }
};
