import Elysia from "elysia";
import { debugController } from "./debug.controller";

export const debugModule = new Elysia({ prefix: "/debug" }).get(
  "/",
  debugController
);
