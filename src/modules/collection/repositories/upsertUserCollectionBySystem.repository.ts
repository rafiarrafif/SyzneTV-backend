import slugify from "slugify";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
import { Prisma } from "@prisma/client";

export interface UpsertUserCollectionRepositoryPayload {
  userId: string;
  collectionName: string;
  mediaConnectId: string;
}

export const upsertUserCollectionBySystemRepository = async (payload: UpsertUserCollectionRepositoryPayload) => {
  try {
    return await prisma.collection.upsert({
      where: {
        slug_ownerId: {
          slug: slugify(payload.collectionName, { lower: true }),
          ownerId: payload.userId,
        },
      },
      update: {
        media_saved: {
          create: {
            id: generateUUIDv7(),
            media: {
              connect: {
                id: payload.mediaConnectId,
              },
            },
          },
        },
      },
      create: {
        id: generateUUIDv7(),
        name: payload.collectionName,
        slug: slugify(payload.collectionName, { lower: true }),
        owner: {
          connect: {
            id: payload.userId,
          },
        },
        media_saved: {
          create: {
            id: generateUUIDv7(),
            media: {
              connect: {
                id: payload.mediaConnectId,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
      throw new AppError(400, "Media item is already in the collection");
    throw new AppError(500, "Failed to upsert user collection");
  }
};
