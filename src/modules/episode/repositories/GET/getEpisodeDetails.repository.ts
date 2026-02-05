import { serializeBigInt } from "../../../../helpers/characters/serializeBigInt";
import { AppError } from "../../../../helpers/error/instances/app";
import { episodeModel } from "../../episode.model";

export const getEpisodeDetailsRepository = async (payload: {
  mediaId: string;
  episode: number;
}) => {
  try {
    const result = await episodeModel.findUnique({
      where: {
        mediaId_episode: {
          mediaId: payload.mediaId,
          episode: payload.episode,
        },
        deletedAt: null,
      },
      select: {
        episode: true,
        name: true,
        score: true,
        pictureThumbnail: true,
        viewed: true,
        likes: true,
        updatedAt: true,
        uploader: {
          select: {
            name: true,
            username: true,
          },
        },
        videos: {
          where: {
            pendingUpload: false,
            deletedAt: null,
          },
          select: {
            code: true,
            service: {
              select: {
                endpointThumbnail: true,
                endpointVideo: true,
                endpointDownload: true,
              },
            },
          },
        },
        media: {
          select: {
            slug: true,
            title: true,
            _count: {
              select: {
                episodes: true,
              },
            },
          },
        },
      },
    });

    return serializeBigInt(result);
  } catch (error) {
    throw new AppError(500, "Failed to fetch episode details.", error);
  }
};
