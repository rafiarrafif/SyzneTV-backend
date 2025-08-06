import Elysia from "elysia";
import { githubRequestController } from "./controllers/githubRequest.controller";
import { githubCallbackController } from "./controllers/githubCallback.controller";
import { googleRequestController } from "./controllers/googleRequest.controller";
import { googleCallbackController } from "./controllers/googleCallback.controller";

export const authModule = new Elysia({ prefix: "/auth" })
  .get("/github", githubRequestController)
  .get("/github/callback", githubCallbackController)
  .get("/google", googleRequestController)
  .get("/google/callback", googleCallbackController);
