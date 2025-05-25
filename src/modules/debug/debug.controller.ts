import { Context } from "elysia";
import { mainErrorHandler } from "../../helpers/error/handler";
import { debugService } from "./debug.service";

export const debugController = (ctx: Context) => {
  ctx.set.status = 418;
  return Math.floor(
    (new Date("2025-07-13 16:22:12.335").getTime() - new Date().getTime()) /
      1000
  );
};

// buat debug untuk date to number (second)
