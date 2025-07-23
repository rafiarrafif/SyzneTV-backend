import { Context } from "elysia";
import { getStreamFile } from "../../../utils/storages/MinIO/operations/getStreamFile";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const streamAssetsController = async (ctx: Context) => {
  try {
    return await getStreamFile(ctx.params["*"]);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
