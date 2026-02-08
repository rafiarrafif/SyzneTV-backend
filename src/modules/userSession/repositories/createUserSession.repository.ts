import { Prisma } from "@prisma/client";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { userSessionModel } from "../userSession.model";
import { generateUUIDv7 } from "../../../helpers/databases/uuidv7";

export const createUserSessionRepository = async (
  data: Omit<Prisma.UserSessionUncheckedCreateInput, "id">,
) => {
  try {
    return await userSessionModel.create({
      data: {
        id: generateUUIDv7(),
        ...data,
      },
      select: {
        id: true,
        isAuthenticated: true,
        validUntil: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            avatar: true,
            birthDate: true,
            bioProfile: true,
            preference: {
              omit: {
                updatedAt: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
