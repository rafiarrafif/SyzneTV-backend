import Elysia from "elysia";
import { createUserViaRegisterController } from "./controller/createUserViaRegister.controller";
import { getUserByEmailController } from "./controller/getUserByEmail.controller";
import { getUserByUsernameController } from "./controller/getUserByUsername.controller";
import { getUserByIdController } from "./controller/getUserById.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .post("/", createUserViaRegisterController)
  .get("/e/:email", getUserByEmailController)
  .get("/u/:username", getUserByUsernameController)
  .get("/id/:id", getUserByIdController);
