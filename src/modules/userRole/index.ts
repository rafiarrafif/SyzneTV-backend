import Elysia from "elysia";
import { createUserRole } from "./controller/createUserRole.controller";

export const userRoleModule = new Elysia({ prefix: "/roles" })
  .get("/", () => "Hello User Role Module")
  .post("/", createUserRole);
