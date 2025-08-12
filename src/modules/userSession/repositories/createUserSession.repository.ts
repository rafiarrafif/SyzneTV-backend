import { Prisma } from "@prisma/client";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { userSessionModel } from "../userSession.model";

export const createUserSessionRepository = async (
  data: Prisma.UserSessionUncheckedCreateInput
) => {
  try {
    return await userSessionModel.create({
      data,
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
