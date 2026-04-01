import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const getMediaBySlugSchema = {
  params: t.Object({
    slug: t.String({ description: "The slug of the media to fetch" }),
  }),
  detail: {
    summary: "Fetch a media item by its slug",
    description: "Fetch the specified media item using its slug. This endpoint returns the media details if found.",
    responses: {
      200: {
        description: "Media item fetched successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                status: { type: "number", example: 200 },
                message: { type: "string", example: "Media fetched successfully" },
              },
            },
          },
        },
      },
    },
  },
} satisfies AppRouteSchema;
