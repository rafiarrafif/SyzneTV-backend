import slugify from "slugify";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { Prisma } from "@prisma/client";

export type DeleteUserCollectionBySystemPayload = {
  userId: string;
  collectionName: string;
  itemId: string;
};

export const deleteItemInUserCollectionBySystemRepository = async (payload: DeleteUserCollectionBySystemPayload) => {
  try {
    return await prisma.collection.update({
      where: {
        slug_ownerId: {
          slug: slugify(payload.collectionName, { lower: true }),
          ownerId: payload.userId,
        },
      },
      data: {
        media_saved: {
          deleteMany: {
            mediaId: payload.itemId,
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to remove item from collection");
  }
};
