import { createUserSessionServiceParams } from "../userSession.types";
import { createUserSessionRepo } from "../repositories/insertUserSessionToDB.repository";
import { storeUserSessionToCacheRepo } from "../repositories/storeUserSessionToCache.repository";

export const createUserSessionService = async (
  data: createUserSessionServiceParams
) => {
  const sessionLifetime = Number(process.env.SESSION_EXPIRE!);
  try {
    const newUserSession = await createUserSessionRepo({
      userId: data.userId,
      isAuthenticated: true,
      deviceType: data.userHeaderInformation.deviceType,
      deviceOs: data.userHeaderInformation.deviceOS,
      deviceIp: data.userHeaderInformation.ip,
      validUntil: new Date(new Date().getTime() + sessionLifetime * 1000),
    });

    const timeExpires = Number(process.env.SESSION_EXPIRE!);
    await storeUserSessionToCacheRepo(newUserSession, timeExpires);

    return newUserSession;
  } catch (error) {
    throw error;
  }
};
