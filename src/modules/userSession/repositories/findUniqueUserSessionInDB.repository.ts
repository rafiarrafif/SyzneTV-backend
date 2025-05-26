import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const findUniqueUserSessionInDBRepo = async (identifier: string) => {
  try {
    const userSession = await prisma.userSession.findUnique({
      where: {
        id: identifier,
      },
      include: {
        user: {
          omit: {
            password: true,
            updatedAt: true,
          },
          include: {
            roles: true,
          },
        },
      },
      omit: {
        deletedAt: true,
        updatedAt: true,
      },
    });

    if (!userSession) return false;

    return userSession;
  } catch (error) {
    throw new AppError(500, "Database Error", error);
  }
};
