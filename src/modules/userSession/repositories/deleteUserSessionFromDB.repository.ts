import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";

export const deleteUserSessionFromDBRepo = async (sessionId: string) => {
  try {
    const deleteUserSessionFromCacheDB = await prisma.userSession.update({
      where: {
        id: sessionId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deleteUserSessionFromCacheDB;
  } catch (error) {
    throw new AppError(500, "Error while remove delete from database", error);
  }
};
