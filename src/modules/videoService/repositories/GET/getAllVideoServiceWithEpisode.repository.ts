import { AppError } from "../../../../helpers/error/instances/app";
import { videoServiceModel } from "../../model";

export const getAllVideoServiceWithEpisodeRepository = async (
  videoServiceId: string,
) => {
  try {
    return await videoServiceModel.findMany({
      where: {
        id: videoServiceId,
        videos: {
          some: {
            episode: {
              pictureThumbnail: null,
            },
          },
        },
      },
      select: {
        endpointThumbnail: true,
        videos: {
          select: {
            thumbnailCode: true,
            episode: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(
      500,
      "An error occurred while fetching video services with episodes.",
    );
  }
};
