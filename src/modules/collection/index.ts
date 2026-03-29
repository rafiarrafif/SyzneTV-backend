import Elysia from "elysia";
import { addItemToCollectionBySytemController } from "./controllers/addItemToCollectionBySytem.controller";
import { addItemToCollectionBySytemSchema } from "./schemas/addItemToCollectionBySytem.schema";
import { removeItemFromCollectionBySytemController } from "./controllers/removeItemFromCollectionBySytem.controller";
import { removeItemFromCollectionBySytemSchema } from "./schemas/removeItemFromCollectionBySytem.schema";

export const collectionModule = new Elysia({ prefix: "/collections", tags: ["Collections"] })
  .post("/sys", addItemToCollectionBySytemController, addItemToCollectionBySytemSchema)
  .delete("/sys", removeItemFromCollectionBySytemController, removeItemFromCollectionBySytemSchema);
