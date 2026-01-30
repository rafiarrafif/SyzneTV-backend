import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const findEpisodeWithMediaIdRepository = async ({
  media,
  episode,
}: {
  media: string;
  episode: number;
}) => {
  try {
    const foundEpisode = await prisma.episode.findUnique({
      where: {
        mediaId_episode: {
          mediaId: media,
          episode: episode,
        },
      },
      select: {
        id: true,
      },
    });
    if (!foundEpisode) throw new AppError(404, "Episode not found");
    return foundEpisode;
  } catch (error) {
    throw new AppError(500, "Error finding episode with media id", error);
  }
};
