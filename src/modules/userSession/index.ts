import Elysia from "elysia";
import { createUserSessionRole } from "./controller/createUserSession.controller";

export const userSessionModule = new Elysia({ prefix: "/user-sessions" }).post(
  "/",
  createUserSessionRole
);
