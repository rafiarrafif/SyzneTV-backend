import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { JWTAuthToken } from "../../../helpers/http/jwt/decode/types";
import { deleteUserSessionFromCacheRepo } from "../repositories/deleteUserSessionFromCache.repository";
import { deleteUserSessionFromDBRepo } from "../repositories/deleteUserSessionFromDB.repository";

export const deleteUserSessionInCacheAndDBService = async (
  jwtToken: JWTAuthToken
) => {
  try {
    // Construct the userId and sessionId from the JWT token
    const userId = jwtToken.userId;
    const sessionId = jwtToken.id;

    // Delete the user session from cache and database
    await deleteUserSessionFromCacheRepo(userId, sessionId);
    const deleteUserSessionFromDB = await deleteUserSessionFromDBRepo(
      sessionId
    );

    return deleteUserSessionFromDB;

    // If the session was not found in the cache or database, throw an error
  } catch (error) {
    ErrorForwarder(
      error,
      500,
      "Delete user session service had encountered error"
    );
  }
};
