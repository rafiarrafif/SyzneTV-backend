import { Context, Static } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { addItemToCollectionBySytemSchema } from "../schemas/addItemToCollectionBySytem.schema";
import { addItemToCollectionBySystemService } from "../services/addItemToCollectionBySystem.service";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const addItemToCollectionBySytemController = async (ctx: {
  set: Context["set"];
  headers: Static<typeof addItemToCollectionBySytemSchema.headers>;
  body: Static<typeof addItemToCollectionBySytemSchema.body>;
}) => {
  try {
    const savedItem = await addItemToCollectionBySystemService({
      cookie: ctx.headers.cookie,
      collectionName: ctx.body.name,
      mediaId: ctx.body.itemId,
    });
    return returnWriteResponse(ctx.set, 200, "Item added to collection successfully", savedItem);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
