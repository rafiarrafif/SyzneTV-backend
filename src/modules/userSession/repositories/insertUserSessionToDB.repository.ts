import { Prisma } from "@prisma/client";
import { userSessionModel } from "../userSession.model";
import { AppError } from "../../../helpers/error/instances/app";

export const createUserSessionRepo = async (
  data: Prisma.UserSessionUncheckedCreateInput
) => {
  try {
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
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return newUserSession;
  } catch (error) {
    throw error;
  }
};
