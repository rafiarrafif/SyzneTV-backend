import { AppError } from "../../../../helpers/error/instances/app";
import { episodeModel } from "../../episode.model";

export const getAllEpisodeWithThumbnailLinkRepository = async (
  serviceReferenceId: string,
) => {
  try {
    return await episodeModel.findMany({
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
    throw new AppError(500, "Failed to get all episode thumbnails", error);
  }
};
