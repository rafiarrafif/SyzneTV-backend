import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const bulkInsertEpisodeSchema = {
  body: t.Object({
    media_mal_id: t.Number({
      description: "The MyAnimeList ID of the media for which episodes will be inserted",
    }),
  }),
  query: t.Object({
    page: t.Optional(
      t.Number({
        description: "Episode page number to fetch",
      }),
    ),
  }),
  detail: {
    summary: "Bulk insert episodes for a media",
    description:
      "Perform bulk insert of episodes for a specific media. This operation fetches episode data from external sources and inserts them into the database. The page parameter is optional; if not provided, the first page of episodes will be fetched.",
    responses: {
      201: {
        description:
          "Bulk insert episode operation completed successfully (Data returned only if the env run on development mode)",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 201 },
                message: {
                  type: "string",
                  default: "Bulk insert episode operation completed successfully",
                },
                data: {
                  type: "object",
                  properties: {
                    pagination: {
                      type: "object",
                      properties: {
                        last_visible_page: { type: "integer", default: 1 },
                        has_next_page: { type: "boolean", default: false },
                      },
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          mal_id: { type: "integer", default: 1 },
                          url: { type: "string", default: "https://myanimelist.net/anime/1" },
                          title: { type: "string", default: "Example Episode Title" },
                          title_japanese: { type: "string", default: "例のエピソードタイトル" },
                          title_romanji: { type: "string", default: "Rei no Episōdo Taitoru" },
                          aired: { type: "string", format: "date-time", default: "2022-01-01T00:00:00.000Z" },
                          score: { type: "number", default: 8.5 },
                          filler: { type: "boolean", default: false },
                          recap: { type: "boolean", default: false },
                          forum_url: { type: "string", default: "https://myanimelist.net/forum/1" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies AppRouteSchema;
