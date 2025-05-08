import { createUserSessionServiceParams } from "../userSession.types";
import { createUserSessionRepo } from "../userSession.repository";
import { redis } from "../../../utils/databases/redis/connection";

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

    await redis.set(
      `${process.env.app_name}:users:${data.userId}:sessions:${newUserSession.id}`,
      String(newUserSession.validUntil),
      "EX",
      Number(process.env.SESSION_EXPIRE!)
    );

    return newUserSession;
  } catch (error) {
    throw error;
  }
};
