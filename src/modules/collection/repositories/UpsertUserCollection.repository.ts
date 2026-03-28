import slugify from "slugify";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export interface UpsertUserCollectionRepositoryPayload {
  userId: string;
  collectionName: string;
  mediaConnectId: string;
}

export const upsertUserCollectionRepository = async (payload: UpsertUserCollectionRepositoryPayload) => {
  try {
    return await prisma.collection.upsert({
      where: {
        slug_ownerId: {
          slug: slugify(payload.collectionName, { lower: true }),
          ownerId: payload.userId,
        },
      },
      update: {
        medias: {
          connect: {
            id: payload.mediaConnectId,
          },
        },
      },
      create: {
        id: generateUUIDv7(),
        name: payload.collectionName,
        slug: slugify(payload.collectionName, { lower: true }),
        ownerId: payload.userId,
        medias: {
          connect: {
            id: payload.mediaConnectId,
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to upsert user collection");
  }
};
