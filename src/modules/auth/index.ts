import Elysia from "elysia";
import { loginWithPassword } from "./controller/loginWithPassword.controller";

export const authModule = new Elysia({ prefix: "/auth" }).post(
  "/legacy",
  loginWithPassword
);
