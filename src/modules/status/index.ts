import Elysia, { Context } from "elysia";
import { returnWriteResponse } from "../../helpers/callback/httpResponse";

export const statusModule = new Elysia({ prefix: "status" }).get(
  "/",
  (ctx: Context) => {
    return returnWriteResponse(ctx.set, 200, "Service is up and running");
  },
);
