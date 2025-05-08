import { createUserSessionServiceParams } from "../userSession.types";
import { createUserSessionRepo } from "../userSession.repository";

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
  } catch (error) {
    throw error;
  }
};
