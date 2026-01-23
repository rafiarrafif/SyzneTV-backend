import { Prisma } from "@prisma/client";
import { generateSlug } from "../../../helpers/characters/generateSlug";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { MediaFullInfoResponse } from "../types/mediaFullInfo.type";

export const InsertMediaRepository = async (data: MediaFullInfoResponse) => {
  try {
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
     */
    const genreIds: string[] = [];
    for (const genre of data.data.genres) {
      const slug = (await generateSlug(genre.name)) as string;
      const genrePayload = {
        name: genre.name,
        malId: genre.mal_id,
        malUrl: genre.url,
        createdBy: "b734b9bc-b4ea-408f-a80e-0a837ce884da",
        slug,
      };
      const insertedGenre = await prisma.genre.upsert({
        where: { slug },
        create: genrePayload,
        update: genrePayload,
        select: { id: true },
      });
      genreIds.push(insertedGenre.id);
    }

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
     */
    const studioIds: string[] = [];
    for (const studio of data.data.studios) {
      const slug = (await generateSlug(studio.name)) as string;
      const studioPayload = {
        name: studio.name,
        malId: studio.mal_id,
        linkAbout: studio.url,
        createdBy: "b734b9bc-b4ea-408f-a80e-0a837ce884da",
        slug,
      };
      const insertedStudio = await prisma.studio.upsert({
        where: { slug },
        create: studioPayload,
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
        createdBy: "b734b9bc-b4ea-408f-a80e-0a837ce884da",
        slug,
      };
      const insertedStudio = await prisma.studio.upsert({
        where: { slug },
        create: studioPayload,
        update: studioPayload,
        select: { id: true },
      });
      studioIds.push(insertedStudio.id);
    }

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
     */
    const construct = {
      title: data.data.title,
      titleAlternative: (data.data.titles as unknown) as Prisma.InputJsonValue,
      slug: await generateSlug(data.data.title, {
        model: "media",
        target: "slug",
      }),
      malId: data.data.mal_id,
      genres: {
        connect: genreIds.map((id) => ({ id })),
      },
      studios: {
        connect: studioIds.map((id) => ({ id })),
      },
      score: data.data.score,
      pictureMedium: data.data.images.webp.image_url,
      pictureLarge: data.data.images.webp.large_image_url,
      status: data.data.status,
      startAiring: data.data.aired.from,
      endAiring: data.data.aired.to,
      synopsis: data.data.synopsis,
      ageRating: data.data.rating,
      mediaType: data.data.type,
      source: data.data.source,
      onDraft: false,
      uploadedBy: "b734b9bc-b4ea-408f-a80e-0a837ce884da",
    };
    return await prisma.media.upsert({
      where: { malId: data.data.mal_id },
      update: construct,
      create: construct,
    });
  } catch (error) {
    throw new AppError(500, "Failed to insert media", error);
  }
};
