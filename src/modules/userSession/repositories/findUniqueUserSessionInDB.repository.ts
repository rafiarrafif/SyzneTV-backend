import { prisma } from "../../../utils/databases/prisma/connection";

export const findUniqueUserSessionInDBRepo = async (identifier: string) => {
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

  return userSession;
};
