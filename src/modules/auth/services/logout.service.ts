import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { deleteUserSessionInCacheAndDBService } from "../../userSession/services/deleteUserSessionInCacheAndDB.service";

export const logoutService = async (userCookie: string) => {
  try {
    const jwtToken = jwtDecode(userCookie);
    const deleteUserSessionInCacheAndDB =
      deleteUserSessionInCacheAndDBService(jwtToken);

    return deleteUserSessionInCacheAndDB;
  } catch (error) {
    ErrorForwarder(error, 500, "Logout service had encountered error");
  }
};
