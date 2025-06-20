import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { UserHeaderInformation } from "../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { createUserSessionService } from "../../userSession/services/createUserSession.service";

export const loginFromSystemService = async (
  userId: string,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    const userSession = await createUserSessionService({
      userId,
      userHeaderInformation: userHeaderInfo,
    });
    return userSession;
  } catch (error) {
    ErrorForwarder(error);
  }
};
