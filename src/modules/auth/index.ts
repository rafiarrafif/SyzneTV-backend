import Elysia from "elysia";
import { loginViaPassword } from "./controller/loginViaPassword.controller";

export const authModule = new Elysia({ prefix: "/auth" }).post(
  "/legacy",
  loginViaPassword
);
