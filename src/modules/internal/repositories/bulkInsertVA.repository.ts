import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const bulkInsertVARepository = async (
  payload: Prisma.VoiceActorUpsertArgs["create"],
) => {
  try {
    const insertedVA = await prisma.voiceActor.upsert({
      where: { malId: payload.malId },
      create: payload,
      update: payload,
      select: { id: true },
    });
    return insertedVA.id;
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert VAs", error);
  }
};
