import { AppError } from "../../../../helpers/error/instances/app";
import { mediaModel } from "../../../media/model";

export const getAllEpisodeFromMediaRepository = async (mediaSlug: string) => {
  try {
    return mediaModel.findUnique({
      where: { slug: mediaSlug },
      select: {
        episodes: {
          select: {
            id: true,
            name: true,
            episode: true,
            pictureThumbnail: true,
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to fetch episodes from media", error);
  }
};
