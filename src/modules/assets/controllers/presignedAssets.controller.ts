import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { getPresignedFileUrl } from "../../../utils/storages/MinIO/operations/getPresignedFileUrl";

export const presignedAssetsController = async (ctx: Context) => {
  try {
    return await getPresignedFileUrl(ctx.params["*"]);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
