import { Prisma } from "@prisma/client";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { userSessionModel } from "../userSession.model";

export const createUserSessionRepository = async (data: Omit<Prisma.UserSessionUncheckedCreateInput, "id">) => {
  try {
    return await userSessionModel.create({
      data: {
        ...data,
      },
      select: {
        id: true,
        browser_name: true,
        ip_login: true,
        valid_until: true,
        user: {
          select: {
            id: true,
            email: true,
            fullname: true,
            username: true,
            avatar: true,
            datebirth: true,
            bio: true,
            preferences: {},
          },
        },
      },
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
