import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const bulkInsertVideoSchema = {
  body: t.Object({
    media_id: t.String({
      description: "The ID of the media for which episodes will be inserted",
    }),
    data: t.Array(
      t.Object({
        episode: t.Number({
          description: "The episode number",
        }),
        videos: t.Array(
          t.Object({
            service_id: t.String({
              description: "The ID of the video service",
            }),
            video_code: t.String({
              description: "The code of the video on the service",
            }),
            thumbnail_code: t.Optional(
              t.String({
                description: "The code of the thumbnail for the video on the service",
              }),
            ),
          }),
        ),
      }),
    ),
  }),
  detail: {
    summary: "Bulk insert videos for a media episode",
    description:
      "Perform bulk insert of videos for specific episodes of a media. This operation inserts multiple videos associated with different episodes into the database based on the provided data.",
    responses: {
      201: {
        description: "Videos inserted successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 201 },
                message: { type: "string", default: "Videos inserted successfully" },
                data: {
                  type: "array",
                  default: ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"],
                  description: "An array of IDs of the inserted videos",
                  items: {
                    type: "string",
                    description: "The ID of the inserted video",
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
