import { SystemAccountId } from "../../../config/account/system";
import { generateSlug } from "../../../helpers/characters/generateSlug";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { MediaFullInfoResponse } from "../types/mediaFullInfo.type";

/**
 * Genres Insertion
 *
 * This section handles the insertion of genres associated with the media.
 * It iterates over each genre in the media data, generates a slug for it,
 * and performs an upsert operation to ensure that the genre is either created
 * or updated in the database. The IDs of the inserted or updated genres are
 * collected for later association with the media.
 *
 * @param data - The full media data containing genres information.
 * @returns An array of IDs of the inserted or updated genres.
 */
export const bulkInsertGenresRepository = async (
  data: MediaFullInfoResponse,
) => {
  try {
    const genreIds: string[] = [];
    for (const genre of data.data.genres) {
      const slug = (await generateSlug(genre.name)) as string;
      const genrePayload = {
        name: genre.name,
        malId: genre.mal_id,
        malUrl: genre.url,
        createdBy: SystemAccountId,
        slug,
      };
      const insertedGenre = await prisma.genre.upsert({
        where: { slug },
        create: {
          id: generateUUIDv7(),
          ...genrePayload,
        },
        update: genrePayload,
        select: { id: true },
      });
      genreIds.push(insertedGenre.id);
    }
    return genreIds;
  } catch (error) {
    throw new AppError(500, "Failed to insert genres", error);
  }
};
