import Elysia from "elysia";
import { getAllUserController } from "./controller/getAllUser.controller";
import { createUserController } from "./controller/createUser.controller";
import { editUserController } from "./controller/editUser.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .get("/", getAllUserController)
  .post("/", createUserController)
  .put("/", editUserController);
