import Elysia from "elysia";
import { addItemToCollectionController } from "./controllers/addItemToCollection.controller";
import { addItemToCollectionSchema } from "./schemas/addItemToCollection.schema";

export const collectionModule = new Elysia({ prefix: "/collections", tags: ["Collections"] }).post(
  "/sys",
  addItemToCollectionController,
  addItemToCollectionSchema,
);
