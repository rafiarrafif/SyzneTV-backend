import Elysia, { Context } from "elysia";
import { returnWriteResponse } from "../../helpers/callback/httpResponse";

export const systemPreferenceModule = new Elysia({
  prefix: "/system-preference",
}).get("/", (ctx: Context) => {
  return returnWriteResponse(
    ctx.set,
    200,
    "System Preference module is up and running",
  );
});
