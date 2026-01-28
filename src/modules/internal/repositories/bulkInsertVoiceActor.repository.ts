import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const bulkInsertVoiceActorRepository = async (
  payload: Omit<Prisma.VoiceActorUncheckedCreateInput, "id">,
) => {
  try {
    return await prisma.voiceActor.upsert({
      where: { malId: payload.malId },
      create: {
        id: generateUUIDv7(),
        ...payload,
      },
      update: payload,
      select: { id: true },
    });
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert voice actor", error);
  }
};
