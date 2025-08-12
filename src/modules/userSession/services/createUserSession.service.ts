import { Prisma } from "@prisma/client";
import { UserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { createUserSessionRepository } from "../repositories/createUserSession.repository";

export const createUserSessionService = async (
  userId: string,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    const generateTokenExpirationDate =
      Date.now() + Number(process.env.SESSION_EXPIRE!) * 1000;

    const constructData = {
      userId,
      isAuthenticated: true,
      deviceType: userHeaderInfo.deviceType,
      deviceOs: userHeaderInfo.deviceOS,
      deviceIp: userHeaderInfo.ip,
      browser: userHeaderInfo.browser,
      validUntil: new Date(generateTokenExpirationDate),
    } as Prisma.UserSessionUncheckedCreateInput;

    return createUserSessionRepository(constructData);
  } catch (error) {
    ErrorForwarder(error);
  }
};
