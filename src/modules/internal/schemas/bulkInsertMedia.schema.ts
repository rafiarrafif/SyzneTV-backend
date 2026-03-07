import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const bulkInsertMediaSchema = {
  body: t.Object({
    media_mal_id: t.Number({
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
  response: {
    201: t.Object({
      success: t.Boolean({ default: true }),
      status: t.Number(),
        message: t.String(),
        data: t.Optional(
            t.Unknown(), 
        ),
    }),
    404: t.Object({
        success: t.Boolean({ default: false }),
        status: t.Number(),
        message: t.String(),
        error: t.Optional(
          t.Unknown(),
        ),
      }),
    500: t.Object({
        success: t.Optional(t.Boolean({ default: false })),
        status: t.Number(),
        message: t.String(),
        error: t.Optional(
          t.Unknown(), 
        ),
      }),
  },
  detail: {
    summary: "Bulk insert media",
    description:
      "Fetch media data from external sources and insert them into database",
  },
} satisfies AppRouteSchema;
