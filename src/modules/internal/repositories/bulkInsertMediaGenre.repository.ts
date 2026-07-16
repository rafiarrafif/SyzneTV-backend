import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import slugify from "slugify";
import { AnimeFullDetail } from "../../../config/apis/myanimelist/types/animeFullDetail.type";

export const bulkInsertMediaGenreRepository = async (mediaData: AnimeFullDetail, mediaId: string) => {
  try {
    await prisma.$transaction(async (tx) => {
      const createdGenres = await tx.genre.createManyAndReturn({
        data: mediaData.data.genres.map((genre) => ({
          name: genre.name,
          mal_id: genre.mal_id,
          slug: slugify(genre.name, {
            lower: true,
            strict: true,
          }),
        })),
        skipDuplicates: true,
        select: {
          mal_id: true,
          id: true,
        },
      });

      await tx.mediaGenre.createMany({
        data: createdGenres.map((genre) => ({
          media_id: mediaId,
          genre_id: genre.id,
        })),
        skipDuplicates: true,
      });
    });
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert media genre", error);
  }
};
