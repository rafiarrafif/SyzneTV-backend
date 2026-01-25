import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const bulkInsertLangVARepository = async (
  payload: Prisma.LangVACharUpsertArgs["create"],
) => {
  try {
    const insertedVA = await prisma.langVAChar.upsert({
      where: {
        language_vaId_charId: {
          language: payload.language,
          vaId: payload.vaId!,
          charId: payload.charId!,
        },
      },
      create: payload,
      update: {},
    });
    return insertedVA.id;
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert VAs", error);
  }
};
