import Elysia from "elysia";
import { githubRequestController } from "./controllers/githubRequest.controller";
import { githubCallbackController } from "./controllers/githubCallback.controller";
import { googleRequestController } from "./controllers/googleRequest.controller";
import { googleCallbackController } from "./controllers/googleCallback.controller";
import { getOauthProvidersController } from "./controllers/getOauthProviders.controller";

export const authModule = new Elysia({ prefix: "/auth" })
  .get("/providers", getOauthProvidersController)
  .get("/github", githubRequestController)
  .get("/github/callback", githubCallbackController)
  .get("/google", googleRequestController)
  .get("/google/callback", googleCallbackController);
