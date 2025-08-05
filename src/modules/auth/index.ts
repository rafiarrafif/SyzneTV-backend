import Elysia from "elysia";
import { githubRequestController } from "./controllers/githubRequest.controller";
import { githubCallbackController } from "./controllers/githubCallback.controller";

export const authModule = new Elysia({ prefix: "/auth" })
  .get("/github", githubRequestController)
  .get("/github/callback", githubCallbackController);
