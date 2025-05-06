import Elysia from "elysia";
import { getAllUser } from "./controller/getAllUser.controller";

export const userModule = new Elysia({ prefix: "/users" })
  .get("/", () => "Hello User Module")
  .post("/", () => getAllUser);
