import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { MediaFullInfoResponse } from "../types/mediaFullInfo.type";

/**
 * Media Payload Construction and Upsert
 *
 * This section constructs the payload for the media insertion or update.
 * It gathers all necessary information from the media data, including
 * title, alternative titles, slug, associated genres and studios, score,
 * images, status, airing dates, synopsis, age rating, media type, source,
 * and other relevant details. This payload is then used in an upsert
 * operation to ensure that the media record is either created or updated
 * in the database.
 *
 * @param data - The full media data for constructing the media payload.
 * @returns The inserted or updated media record.
 */
export const InsertMediaRepository = async ({
  malId,
  payload,
}: {
  malId: number;
  payload: Prisma.MediaUpsertArgs["create"];
}) => {
  try {
    return await prisma.media.upsert({
      where: { malId },
      update: payload,
      create: payload,
    });
  } catch (error) {
    throw new AppError(500, "Failed to insert media", error);
  }
};
