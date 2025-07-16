import Elysia from "elysia";
import { createUserViaRegisterController } from "./controller/createUserViaRegister.controller";

export const userModule = new Elysia({ prefix: "/users" }).post(
  "/",
  createUserViaRegisterController
);
