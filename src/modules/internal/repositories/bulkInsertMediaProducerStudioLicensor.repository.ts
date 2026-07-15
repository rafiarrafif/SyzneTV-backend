import { Prisma } from "@prisma/client";
import { GenreOrProducer } from "../types/mediaFullInfo.type";
import { SystemAccountId } from "../../../config/account/system";


/**
 * Bulk Insert Producer, Studio, Licensor
 *
 * This function handles the bulk insertion of producers, studios, and licensors.
 * It takes a transaction client, the ID of the media, and an array of producer, studio, and licensor objects.
 * */
export const bulkInsertMediaProducerStudioLicensorRepository = async (
  tx: Prisma.TransactionClient,
  media_id: string,
  payload: (GenreOrProducer & { status: "producer" | "licensor" | "studio" })[],
) => {
  await tx.producer.createMany({
    data: payload.map((p) => ({
      mal_id: p.mal_id,
      type: p.type,
      name: p.name,
      url: p.url,
      created_by_id: SystemAccountId,
    })),
    skipDuplicates: true,
  });

  const insertedProducers = (
    await tx.producer.findMany({
      where: {
        mal_id: {
          in: payload.map((p) => p.mal_id),
        },
      },
      select: {
        id: true,
        mal_id: true,
      },
    })
  ).map((producer) => {
    const statusProducer = payload.find((p) => p.mal_id === producer.mal_id)?.status;
    return {
      id: producer.id,
      mal_id: producer.mal_id,
      status: statusProducer,
    };
  });

  await tx.mediaProducer.createMany({
    data: insertedProducers
      .filter((p) => p.status === "producer")
      .map((producer) => ({
        media_id,
        producer_id: producer.id,
      })),
    skipDuplicates: true,
  });

  await tx.mediaLicensor.createMany({
    data: insertedProducers
      .filter((p) => p.status === "licensor")
      .map((producer) => ({
        media_id,
        licensor_id: producer.id,
      })),
    skipDuplicates: true,
  });

  await tx.mediaStudio.createMany({
    data: insertedProducers
      .filter((p) => p.status === "studio")
      .map((producer) => ({
        media_id,
        studio_id: producer.id,
      })),
    skipDuplicates: true,
  });

  return insertedProducers;
};
