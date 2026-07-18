import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { AnimeFullDetail } from "../../../config/apis/myanimelist/types/animeFullDetail.type";
import { prisma } from "../../../utils/databases/prisma/connection";
import { bulkInsertMediaProducerStudioLicensorRepository } from "./bulkInsertMediaProducerStudioLicensor.repository";

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
export const InsertMediaRepository = async ({ payload }: { payload: AnimeFullDetail["data"] }) => {
  try {
    const constructMediaPayload: Prisma.MediaUpsertArgs["create"] = {
      mal_id: payload.mal_id,
      title: payload.title,
      title_secondary: payload.title_english,
      title_original: payload.title_japanese,
      title_synonyms: payload.title_synonyms,
      ...(payload.trailer.embed_url && {
        trailer: {
          connectOrCreate: {
            where: {
              embed_url: payload.trailer.embed_url,
            },
            create: {
              embed_url: payload.trailer.embed_url,
              url: payload.trailer.url,
              small_image_url: payload.trailer.images?.small_image_url,
              large_image_url: payload.trailer.images?.large_image_url,
              maximum_image_url: payload.trailer.images?.maximum_image_url,
            },
          },
        },
      }),
      synopsis: payload.synopsis,
      small_image_url: payload.images.jpg.small_image_url,
      medium_image_url: payload.images.jpg.image_url,
      large_image_url: payload.images.jpg.large_image_url,
      type: {
        connectOrCreate: {
          where: {
            name: payload.type.toLowerCase(),
          },
          create: {
            name: payload.type.toLowerCase(),
          },
        },
      },
      source: {
        connectOrCreate: {
          where: {
            name: payload.source.toLowerCase(),
          },
          create: {
            name: payload.source.toLowerCase(),
          },
        },
      },
      status: {
        connectOrCreate: {
          where: {
            name: payload.status.toLowerCase(),
          },
          create: {
            name: payload.status.toLowerCase(),
          },
        },
      },
      airing: payload.airing,
      start_airing: payload.aired.from,
      end_airing: payload.aired.to,
      age_rating: {
        connectOrCreate: {
          where: {
            name: payload.rating.toLowerCase(),
          },
          create: {
            name: payload.rating.toLowerCase(),
            min_age: 0, // Placeholder, as the actual age rating details may require additional mapping
          },
        },
      },
      score_total: 0,
      score_count: 0,
      background: payload.background,
      season: payload.season,
      year: payload.year,
      country: {
        connectOrCreate: {
          where: {
            code: "jpn",
          },
          create: {
            name: "japan",
            slug: "japan",
            code: "jpn",
          },
        },
      },
      broadcast_day: payload.broadcast.day,
    };

    const producerPayload = [
      ...payload.producers.map((producer) => ({
        mal_id: producer.mal_id,
        type: producer.type,
        name: producer.name,
        url: producer.url,
        status: "producer" as const,
      })),
      ...payload.licensors.map((licensor) => ({
        mal_id: licensor.mal_id,
        type: licensor.type,
        name: licensor.name,
        url: licensor.url,
        status: "licensor" as const,
      })),
      ...payload.studios.map((studio) => ({
        mal_id: studio.mal_id,
        type: studio.type,
        name: studio.name,
        url: studio.url,
        status: "studio" as const,
      })),
    ];

    return await prisma.$transaction(async (tx) => {
      const media = await tx.media.upsert({
        where: { mal_id: payload.mal_id },
        create: constructMediaPayload,
        update: constructMediaPayload,
        select: {
          id: true,
        },
      });

      await bulkInsertMediaProducerStudioLicensorRepository(tx, media.id, producerPayload);
      return {
        id: media.id,
        mal_id: payload.mal_id,
        name: payload.title,
      };
    });
  } catch (error) {
    throw new AppError(500, "Failed to insert media", error);
  }
};
