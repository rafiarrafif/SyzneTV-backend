import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";
import { t } from "elysia";

export const createHomeMediaBannerSchema = {
  body: t.Object({
    malId: t.Number({
      description:
        "The MyAnimeList ID of the anime you want to display. Make sure the anime is already in the database.",
    }),
    priority: t.Optional(
      t.Number({
        description:
          "Priority order. The lower the number, the higher it appears in the list. If left blank, it will be displayed based on the time the banner was added.",
        minimum: 0,
      }),
    ),
    startShow: t.Date({
      description: "Date when the banner began to appear",
    }),
    endShow: t.Date({
      description: "Date when the banner stops being shown",
    }),
  }),
  detail: {
    summary: "Add home media banner",
    description: "Adding media to a banner that will be displayed on the home page",
    responses: {
      201: {
        description: "Media banner added successfully",
        content: {
          "application/schema": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 201 },
                message: { type: "string", default: "Media banner added successfully" },
                data: {
                  type: "object",
                  properties: {
                    id: { type: "string", default: "019f763c-xxxx-xxxx-xxxx-xxxxxxxx" },
                    priority: { type: "number", default: 1 },
                    start_show: { type: "string", default: "2026-07-18T00:00:00.000Z" },
                    end_show: { type: "string", default: "2026-07-18T00:00:00.000Z" },
                    created_at: { type: "string", default: "2026-07-18T00:00:00.000Z" },
                    media_id: { type: "string", default: "019f763c-xxxx-xxxx-xxxx-xxxxxxxx" },
                    created_by_id: { type: "string", default: "019f763c-xxxx-xxxx-xxxx-xxxxxxxx" },
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
