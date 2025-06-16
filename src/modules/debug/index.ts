import Elysia from "elysia";
import { debugController } from "./debug.controller";

export const debugModule = new Elysia({ prefix: "/debug" }).post(
  "/:username/:email",
  debugController
);
