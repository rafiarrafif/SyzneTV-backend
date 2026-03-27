import { Context, Static } from "elysia";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { addItemToCollectionSchema } from "../schemas/addItemToCollection.schema";

export const addItemToCollectionController = async (ctx: {
  set: Context["set"];
  headers: Static<typeof addItemToCollectionSchema.headers>;
}) => {
  return returnWriteResponse(ctx.set, 200, "Item added to collection successfully" + ctx.headers.cookie);
};
