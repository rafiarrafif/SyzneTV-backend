import { Prisma } from "@prisma/client";
import { userSessionModel } from "./userSession.model";

export const createUserSessionRepo = async (
  data: Prisma.UserSessionUncheckedCreateInput
) => {
  try {
    const newUserRole = await userSessionModel.create({
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
    });
    return newUserRole;
  } catch (error) {
    throw error;
  }
};
