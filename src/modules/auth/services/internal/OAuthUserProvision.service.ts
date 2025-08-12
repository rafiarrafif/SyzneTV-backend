import { User } from "@prisma/client";
import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { findUserService } from "../../../user/services/internal/findUser.service";
import { createUserSessionService } from "../../../userSession/services/createUserSession.service";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const OAuthUserProvisionService = async (
  payload: {
    providerName: string;
    openId: string;
    email: string;
    username?: string;
    name: string;
    avatar?: string;
    bio?: string;
  },
  providerRawCallback: unknown,
  userHeaderInfo: UserHeaderInformation
) => {
  /**
   * Create auth session if user already exist,
   * create user account and give them auth session if not
   *
   * This is just example!!
   */
  try {
    const providerId = `${payload.providerName}_${payload.openId}`;
    const findUserResult = (await findUserService({
      identifier: providerId,
      queryTarget: "providerId",
      options: { verbosity: "full" },
    })) as User;

    if (findUserResult) {
      return await createUserSessionService(findUserResult.id, userHeaderInfo);
    } else {
      return "Not Found";
    }
  } catch (error) {
    ErrorForwarder(error);
  }
};
