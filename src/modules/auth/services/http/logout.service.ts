import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../../helpers/http/jwt/decode";
import { redis } from "../../../../utils/databases/redis/connection";
import { deleteUserSessionRepository } from "../../../userSession/repositories/deleteUserSession.repository";

export const logoutService = async (jwtToken?: any) => {
  try {
    if (!jwtToken) throw new AppError(403, "No auth token provided");

    const jwtPayload = jwtDecode(jwtToken);

    await redis.del(
      `${process.env.APP_NAME}:users:${jwtPayload.user.id}:sessions:${jwtPayload.id}`,
    );

    return deleteUserSessionRepository(jwtPayload.id);
  } catch (error) {
    ErrorForwarder(error);
  }
};
