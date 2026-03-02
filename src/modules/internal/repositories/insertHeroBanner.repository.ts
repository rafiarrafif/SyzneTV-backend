import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";
import { SystemAccountId } from "../../../config/account/system";

export const insertHeroBannerRepository = async (
  payload: Omit<Prisma.HeroBannerCreateInput, "id" | "createdBy">,
) => {
  try {
    return await prisma.heroBanner.create({
      data: {
        id: generateUUIDv7(),
        creatorId: SystemAccountId,
        ...payload,
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to insert hero banner", error);
  }
};
