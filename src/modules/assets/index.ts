import Elysia from "elysia";
import { streamAssetsController } from "./controllers/streamAssets.controller";
import { presignedAssetsController } from "./controllers/presignedAssets.controller";

export const assetsModule = new Elysia({ prefix: "/assets" })
  .get("/stream/*", streamAssetsController)
  .get("/presigned/*", presignedAssetsController);
