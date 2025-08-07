import { AppError } from "../../../../helpers/error/instances/app";
import { githubProvider } from "../../providers/github.provider";

export const githubCallbackService = async (code: string) => {
  try {
    const github = githubProvider();
    const tokens = await github.validateAuthorizationCode(code);
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

    return {
      userdata: await userdata.json(),
      useremail: await useremail.json(),
    };
  } catch (error) {
    return new AppError(500, "Authentication service error", error);
  }
};
