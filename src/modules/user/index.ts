import Elysia from "elysia";
import { getAllUserController } from "./controller/getAllUser.controller";
import { createUserController } from "./controller/createUser.controller";
import { editUserController } from "./controller/editUser.controller";
import { unautenticatedMiddleware } from "../../middleware/auth/unauthenticated.middleware";

export const userModule = new Elysia({ prefix: "/users" })
  .get("/", getAllUserController)
  .put("/", editUserController)
  .group("", (app) =>
    app.onBeforeHandle(unautenticatedMiddleware).post("/", createUserController)
  );
