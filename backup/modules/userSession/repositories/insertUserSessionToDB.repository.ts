import { Prisma } from "@prisma/client";
import { userSessionModel } from "../userSession.model";

export const createUserSessionRepo = async (
  data: Prisma.UserSessionUncheckedCreateInput
) => {
  const newUserSession = await userSessionModel.create({
    data: data,
    include: {
      user: {
        omit: {
          password: true,
        },
        include: {
          roles: true,
        },
      },
    },
    omit: {
      lastOnline: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newUserSession;
};
