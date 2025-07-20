import Elysia from "elysia";
import { createUserViaRegisterController } from "./controllers/createUserViaRegister.controller";
import { getUserByEmailController } from "./controllers/getUserByEmail.controller";
import { getUserByUsernameController } from "./controllers/getUserByUsername.controller";
import { getUserByIdController } from "./controllers/getUserById.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .post("/", createUserViaRegisterController)
  .get("/e/:email", getUserByEmailController)
  .get("/u/:username", getUserByUsernameController)
  .get("/id/:id", getUserByIdController);
