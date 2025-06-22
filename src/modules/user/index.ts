import Elysia from "elysia";
import { getAllUserController } from "./controller/getAllUser.controller";
import { createUserController } from "./controller/createUser.controller";
import { editUserController } from "./controller/editUser.controller";
import { unautenticatedMiddleware } from "../../middleware/auth/unauthenticated.middleware";
import { authenticatedMiddleware } from "../../middleware/auth/authenticated.middleware";

export const userModule = new Elysia({ prefix: "/users" })
  .get("/", getAllUserController)
  .group("", (app) =>
    app.onBeforeHandle(unautenticatedMiddleware).post("/", createUserController)
  )
  .group("", (app) =>
    app.onBeforeHandle(authenticatedMiddleware).put("/", editUserController)
  );
