import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const bulkInsertCharactersRepository = async (
  payload: Omit<Prisma.CharacterUncheckedCreateInput, "id">,
) => {
  try {
    return await prisma.character.upsert({
      where: { malId: payload.malId },
      create: {
        id: generateUUIDv7(),
        ...payload,
      },
      update: payload,
      select: { id: true },
    });
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert characters", error);
  }
};
