import { GitHub } from "arctic";

export const githubProvider = (
  callbackURI = `${process.env.APP_PROTOCOL}://${process.env.APP_DOMAIN}${process.env.GITHUB_DEFAULT_CALLBACK}`
) => {
  return new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!,
    callbackURI
  );
};
