import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { findUserService } from "../../../user/services/internal/findUser.service";

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
  const providerId = `${payload.providerName}_${payload.openId}`;
  const findUserResult = await findUserService({
    identifier: providerId,
    queryTarget: "providerId",
    options: { verbosity: "exists" },
  });

  if (findUserResult) {
    return "Already Created";
  } else {
    return "Not Found";
  }
};
