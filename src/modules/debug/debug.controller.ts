import { Context } from "elysia";
import { mainErrorHandler } from "../../helpers/error/handler";
import { debugService } from "./debug.service";
import { returnWriteResponse } from "../../helpers/callback/httpResponse";

export const debugController = async (ctx: Context) => {
  try {
    const dataFromService = await debugService();
    return returnWriteResponse(ctx.set, 200, "Message Sent", dataFromService);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};

// buat debug untuk date to number (second)
