import { Prisma } from "@prisma/client";
import { MediaFullInfoResponse } from "../../types/mediaFullInfo.type";
import { prisma } from "../../../../utils/databases/prisma/connection";

interface InsertedProducer {
  producer: string[];
  licensor: string[];
  studio: string[];
}

export const bulkInsertProducerService = async (payload: MediaFullInfoResponse, systemAccountId: string) => {
  const insertedPayload: InsertedProducer = {
    producer: [],
    licensor: [],
    studio: [],
  };

  const insertingMainProducer = await prisma.producer.createMany({
    data: payload.data.producers.map((producer) => ({
      mal_id: producer.mal_id,
      type: producer.type,
      name: producer.name,
      url: producer.url,
      created_by_id: systemAccountId,
    })),
    skipDuplicates: true,
  });
};
