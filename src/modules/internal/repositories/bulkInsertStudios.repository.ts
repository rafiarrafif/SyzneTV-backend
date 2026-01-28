import { SystemAccountId } from "../../../config/account/system";
import { generateSlug } from "../../../helpers/characters/generateSlug";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { MediaFullInfoResponse } from "../types/mediaFullInfo.type";

/**
 * Studios Insertion
 *
 * This section manages the insertion of studios associated with the media.
 * It processes each studio listed in the media data, generating a slug for
 * each and performing an upsert operation to either create or update the
 * studio record in the database. The IDs of the inserted or updated studios
 * are collected for later association with the media.
 *
 * @param data - The full media data containing studios information.
 * @returns An array of IDs of the inserted or updated studios.
 */
export const bulkInsertStudiosRepository = async (
  data: MediaFullInfoResponse,
) => {
  try {
    const studioIds: string[] = [];
    for (const studio of data.data.studios) {
      const slug = (await generateSlug(studio.name)) as string;
      const studioPayload = {
        name: studio.name,
        malId: studio.mal_id,
        linkAbout: studio.url,
        createdBy: SystemAccountId,
        slug,
      };
      const insertedStudio = await prisma.studio.upsert({
        where: { slug },
        create: {
          id: generateUUIDv7(),
          ...studioPayload,
        },
        update: studioPayload,
        select: { id: true },
      });
      studioIds.push(insertedStudio.id);
    }
    for (const studio of data.data.producers) {
      const slug = (await generateSlug(studio.name)) as string;
      const studioPayload = {
        name: studio.name,
        malId: studio.mal_id,
        linkAbout: studio.url,
        createdBy: SystemAccountId,
        slug,
      };
      const insertedStudio = await prisma.studio.upsert({
        where: { slug },
        create: {
          id: generateUUIDv7(),
          ...studioPayload,
        },
        update: studioPayload,
        select: { id: true },
      });
      studioIds.push(insertedStudio.id);
    }
    return studioIds;
  } catch (error) {
    throw new AppError(500, "Failed to insert studios", error);
  }
};
