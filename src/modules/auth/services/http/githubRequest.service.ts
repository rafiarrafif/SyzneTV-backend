import * as arctic from "arctic";
import { githubProvider } from "../../providers/github.provider";
import { AppError } from "../../../../helpers/error/instances/app";

export const githubRequestService = async () => {
  try {
    const github = githubProvider();
    const state = arctic.generateState();
    const scopes = ["user:email"];
    const url = github.createAuthorizationURL(state, scopes);

    return url;
  } catch (error) {
    throw new AppError(500, "Oops! something happening", error);
  }
};
