import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { JWTAuthToken } from "../../../helpers/http/jwt/decode/types";
import { deleteUserSessionFromCacheRepo } from "../repositories/deleteUserSessionFromCache.repository";
import { deleteUserSessionFromDBRepo } from "../repositories/deleteUserSessionFromDB.repository";

export const deleteUserSessionInCacheAndDBService = async (
  jwtToken: JWTAuthToken
) => {
  try {
    const userId = jwtToken.userId;
    const sessionId = jwtToken.id;

    await deleteUserSessionFromCacheRepo(userId, sessionId);
    const deleteUserSessionFromDB = await deleteUserSessionFromDBRepo(
      sessionId
    );
    return deleteUserSessionFromDB;
  } catch (error) {
    ErrorForwarder(
      error,
      500,
      "Delete user session service had encountered error"
    );
  }
};
