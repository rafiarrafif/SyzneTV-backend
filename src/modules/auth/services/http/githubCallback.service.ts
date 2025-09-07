import { AppError } from "../../../../helpers/error/instances/app";
import { UserHeaderInformation } from "../../../../helpers/http/userHeader/getUserHeaderInformation/types";
import { GithubCallbackUserData } from "../../auth.types";
import { githubProvider } from "../../providers/github.provider";
import { OAuthUserProvisionService } from "../internal/OAuthUserProvision.service";

export const githubCallbackService = async (
  query: { code: string; callbackURI: string },
  userHeaderInfo: UserHeaderInformation
) => {
  try {
    const github = githubProvider(query.callbackURI);
    const tokens = await github.validateAuthorizationCode(query.code);
    const accessToken = tokens.accessToken();
    const userdata = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const useremail = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userPayload: GithubCallbackUserData = {
      user_data: await userdata.json(),
      user_email: await useremail.json(),
    };

    return await OAuthUserProvisionService(
      {
        provider: "github",
        providerId: userPayload.user_data.id.toString(),
        providerToken: accessToken,
        providerPayload: userPayload,
        email:
          userPayload.user_email.find((email) => email.primary === true)
            ?.email || userPayload.user_email[0].email,
        username: `git_${userPayload.user_data.id}`,
        name: userPayload.user_data.name,
        avatar: userPayload.user_data.avatar_url,
        password: Math.random()
          .toString(36)
          .slice(2, 16),
      },
      userHeaderInfo
    );
  } catch (error) {
    return new AppError(500, "Authentication service error", error);
  }
};
