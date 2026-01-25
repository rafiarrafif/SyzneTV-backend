import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const bulkInsertCharactersRepository = async (
  payload: Prisma.CharacterUpsertArgs["create"],
) => {
  try {
    return await prisma.character.upsert({
      where: { malId: payload.malId },
      create: payload,
      update: payload,
      select: { id: true },
    });
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert characters", error);
  }
};
