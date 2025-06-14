import Elysia from "elysia";
import { createUserSessionRole } from "./controllers/createUserSession.controller";

export const userSessionModule = new Elysia({ prefix: "/user-sessions" }).post(
  "/",
  createUserSessionRole
);
