import { Context, Static } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { addItemToCollectionSchema } from "../schemas/addItemToCollection.schema";
import { addItemToCollectionService } from "../services/addItemToCollection.service";
import { mainErrorHandler } from "../../../helpers/error/handler";

export const addItemToCollectionController = async (ctx: {
  set: Context["set"];
  headers: Static<typeof addItemToCollectionSchema.headers>;
  params: Static<typeof addItemToCollectionSchema.params>;
  body: Static<typeof addItemToCollectionSchema.body>;
}) => {
  try {
    const savedItem = await addItemToCollectionService({
      cookie: ctx.headers.cookie,
      collectionName: ctx.params.name,
      mediaId: ctx.body.itemId,
    });
    return returnWriteResponse(ctx.set, 200, "Item added to collection successfully", savedItem);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
