import Elysia from "elysia";
import { createUserViaRegisterController } from "./controller/createUserViaRegister.controller";
import { getUserByEmailController } from "./controller/getUserByEmail.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .post("/", createUserViaRegisterController)
  .get("/e/:email", getUserByEmailController);
