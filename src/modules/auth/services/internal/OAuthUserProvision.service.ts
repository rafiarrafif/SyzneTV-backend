import { User } from "@prisma/client";
import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { findUserService } from "../../../user/services/internal/findUser.service";
import { createUserSessionService } from "../../../userSession/services/createUserSession.service";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { createUserViaOauth } from "../../../user/user.types";
import { createUserService } from "../../../user/services/internal/createUser.service";

export const OAuthUserProvisionService = async (
  payload: createUserViaOauth,
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    const providerId = payload.providerId;
    const findUserResult = (await findUserService({
      identifier: providerId,
      queryTarget: "providerId",
      options: { verbosity: "full" },
    })) as User;

    if (findUserResult) {
      return await createUserSessionService(findUserResult.id, userHeaderInfo);
    } else {
      const createdUser = await createUserService(payload);
      return await createUserSessionService(createdUser.id, userHeaderInfo);
    }
  } catch (error) {
    ErrorForwarder(error);
  }
};
