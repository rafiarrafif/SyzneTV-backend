import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const bulkInsertMediaSchema = {
  body: t.Object({
    mal_id: t.Number({
      description:
        "The MyAnimeList ID of the media for which episodes will be inserted",
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
    summary: "Bulk insert media",
    description:
      "Fetch media data from external sources and insert them into database",
    responses: {
      201: {
        description: "Bulk insert media operation completed successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 201 },
                message: {
                  type: "string",
                  default: "Bulk insert anime operation completed successfully",
                },
                data: {
                  type: "object",
                  properties: {
                    status: { type: "string", default: "airing" },
                    id: {
                      type: "string",
                      default: "019cc6c9-80b2-7f9a-b1b4-c8fb612ed481",
                    },
                    title: { type: "string", default: "Sakamoto Days" },
                    titleAlternative: { type: "object", default: {} },
                    slug: { type: "string", default: "sakamoto-days" },
                    malId: { type: "integer", default: 58939 },
                    pictureMedium: {
                      type: "string",
                      default:
                        "https://myanimelist.net/images/anime/1026/146459.webp",
                    },
                    pictureLarge: {
                      type: "string",
                      default:
                        "https://myanimelist.net/images/anime/1026/146459.webp",
                    },
                    country: { type: "string", default: "JP" },
                    score: { type: "string", default: "9.0" },
                    startAiring: {
                      type: "string",
                      format: "date-time",
                      default: "2022-07-01T00:00:00.000Z",
                    },
                    endAiring: {
                      type: "string",
                      format: "date-time",
                      default: "2022-07-01T00:00:00.000Z",
                    },
                    synopsis: {
                      type: "string",
                      default: "No synopsis available",
                    },
                    ageRating: { type: "string", default: "PG-13" },
                    mediaType: { type: "string", default: "ANIME" },
                    source: { type: "string" },
                    onDraft: { type: "boolean", default: false },
                    uploadedBy: { type: "string", default: "system" },
                    deletedAt: {
                      type: "string",
                      format: "date-time",
                      default: "2022-07-01T00:00:00.000Z",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      default: "2022-07-01T00:00:00.000Z",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      default: "2022-07-01T00:00:00.000Z",
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
