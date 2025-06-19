import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { deleteUserSessionInCacheAndDBService } from "../../userSession/services/deleteUserSessionInCacheAndDB.service";

export const logoutService = async (userCookie: string) => {
  try {
    // Decode the JWT token to get the user session
    const jwtToken = jwtDecode(userCookie);

    // Delete the user session from cache and database
    const deleteUserSessionInCacheAndDB =
      deleteUserSessionInCacheAndDBService(jwtToken);
    return deleteUserSessionInCacheAndDB;

    // If the session was not found in the cache or database, throw an error
  } catch (error) {
    ErrorForwarder(error, 500, "Logout service had encountered error");
  }
};
