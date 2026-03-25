import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
import { SystemAccountId } from "../../../config/account/system";
import { Static } from "elysia";
import { createHeroBannerSchema } from "../schemas/createHeroBanner.schema";
import { Prisma } from "@prisma/client";

export const insertHeroBannerRepository = async (payload: Static<typeof createHeroBannerSchema.body>) => {
  try {
    return await prisma.heroBanner.create({
      data: {
        id: generateUUIDv7(),
        creatorId: SystemAccountId,
        ...payload,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new AppError(400, "A hero banner with the order priority already exists", error);
    }
    throw new AppError(500, "Failed to insert hero banner", error);
  }
};
