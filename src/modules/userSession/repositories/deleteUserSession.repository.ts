import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const deleteUserSessionRepository = async (sessionId: string) => {
  try {
    return await prisma.userSession.update({
      where: {
        id: sessionId,
      },
      data: {
        isAuthenticated: false,
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to delete user session", error);
  }
};
