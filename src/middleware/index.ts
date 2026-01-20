import Elysia from "elysia";
import { appAccessTokenMiddleware } from "./global/appAccessToken.middleware";

export const middleware = new Elysia({ name: "middlewareModule" }).use(
  appAccessTokenMiddleware,
);
