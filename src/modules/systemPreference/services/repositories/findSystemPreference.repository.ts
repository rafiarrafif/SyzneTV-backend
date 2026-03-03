import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const findSystemPreferenceRepository = async (key: string) => {
  try {
    return await prisma.systemPreference.findUnique({
      where: {
        key,
        deletedAt: null,
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to find system preference", error);
  }
};
