import Elysia from "elysia";
import { getAllUser } from "./controller/getAllUser.controller";
import { createUser } from "./controller/createUser.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .get("/", getAllUser)
  .post("/", createUser);
