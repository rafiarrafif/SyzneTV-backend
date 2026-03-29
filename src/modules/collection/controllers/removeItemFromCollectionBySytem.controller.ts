import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { removeItemFromCollectionBySystemService } from "../services/removeItemFromCollectionBySystem.service";
import { removeItemFromCollectionBySytemSchema } from "../schemas/removeItemFromCollectionBySytem.schema";

export const removeItemFromCollectionBySytemController = async (ctx: {
  set: Context["set"];
  headers: Static<typeof removeItemFromCollectionBySytemSchema.headers>;
  body: Static<typeof removeItemFromCollectionBySytemSchema.body>;
}) => {
  try {
    const removedItem = await removeItemFromCollectionBySystemService({
      cookie: ctx.headers.cookie,
      collectionName: ctx.body.name,
      mediaId: ctx.body.itemId,
    });
    return returnWriteResponse(ctx.set, 200, "Item removed from collection successfully", removedItem);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
