import { Prisma } from "@prisma/client";
import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const bulkInsertLangVARepository = async (
  payload: Omit<Prisma.LangVACharUncheckedCreateInput, "id">,
) => {
  try {
    const insertedVA = await prisma.langVAChar.upsert({
      where: {
        language_vaId_charId: {
          language: payload.language as string,
          vaId: payload.vaId as string,
          charId: payload.charId as string,
        },
      },
      create: {
        id: generateUUIDv7(),
        ...payload,
      },
      update: payload,
    });
    return insertedVA.id;
  } catch (error) {
    throw new AppError(500, "Failed to bulk insert VAs", error);
  }
};
