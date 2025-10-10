import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { createUserSessionService } from "../../../userSession/services/createUserSession.service";
import { createUserViaRegisterInput } from "../../user.types";
import { createUserService } from "../internal/createUser.service";

export const createUserViaRegisterService = async (
  payload: createUserViaRegisterInput,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    const createdUser = await createUserService(payload);
    return createUserSessionService(createdUser.id, userHeaderInfo);
  } catch (error) {
    ErrorForwarder(error);
  }
};
