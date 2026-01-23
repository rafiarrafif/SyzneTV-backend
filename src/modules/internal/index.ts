import Elysia, { Context } from "elysia";
import { MediaFullInfoResponse } from "./types/mediaFullInfo.type";
import { InsertMediaRepository } from "./repositories/insertMedia.repository";
import { mainErrorHandler } from "../../helpers/error/handler";

const masterSourceAPI = "https://api.jikan.moe/v4";

export const internalModule = new Elysia({ prefix: "/internal" }).post(
  "/medias",
  async (ctx: Context & { body: { mal_id: number } }) => {
    try {
      const fullMediaData = await fetch(
        `${masterSourceAPI}/anime/${ctx.body.mal_id}/full`,
      )
        .then((res) => res.json())
        .then((data) => data as MediaFullInfoResponse);

      // return fullMediaData;
      const createMedia = await InsertMediaRepository(fullMediaData);
      return createMedia;
    } catch (error) {
      return mainErrorHandler(ctx.set, error);
    }
  },
);
