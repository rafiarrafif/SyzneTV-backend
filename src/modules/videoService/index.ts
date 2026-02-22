import Elysia, { Context } from "elysia";
import { returnWriteResponse } from "../../helpers/callback/httpResponse";

export const videoServiceModule = new Elysia({ prefix: "/video-service" }).get(
  "/",
  async (ctx: Context) => {
    return returnWriteResponse(
      ctx.set,
      200,
      "Video service endpoint is working.",
    );
  },
);
