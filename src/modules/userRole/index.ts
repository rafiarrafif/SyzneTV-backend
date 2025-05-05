import Elysia from "elysia";
import { createUserRole } from "./controller/createUserRole.controller";

export const userRoleModule = new Elysia({ prefix: "/user-role" })
  .get("/", () => "Hello User Role Module")
  .post("/create", createUserRole);
