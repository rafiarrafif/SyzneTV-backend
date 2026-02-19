import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const deleteAllUnusedUserSessionRepository = async () => {
  try {
    return await prisma.userSession.deleteMany({
      where: {
        isAuthenticated: false,
        deletedAt: {
          not: null,
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to delete all unused user sessions", error);
  }
};
