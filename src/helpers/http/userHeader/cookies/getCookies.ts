import { parse } from "cookie";
import { Context } from "elysia";
import { AppError } from "../../../error/instances/app";

export const getCookie = (ctx: Context) => {
  try {
    const cookiePayload = ctx.request.headers.get("Cookie");
    const cookies = parse(cookiePayload!);
    return cookies;
  } catch (error) {
    throw new AppError(401, "Cookie not found");
  }
};
