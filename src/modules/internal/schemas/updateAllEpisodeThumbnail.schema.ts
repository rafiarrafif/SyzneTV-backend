import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const updateAllEpisodeThumbnailSchema = {
  body: t.Object({
    service_reference_id: t.String({
      description: "The ID of the service to which the target of episode thumbnails belong",
    }),
  }),
  detail: {
    summary: "Bulk update episode thumbnails",
    description:
      "Perform bulk update of episode thumbnails for all episodes associated with a specific service reference ID. This operation fetches the latest thumbnail data from external sources and updates the existing episode records in the database accordingly.",
    responses: {
      204: {
        description: "Updating episode thumbnails operation completed successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 204 },
                message: {
                  type: "string",
                  default: "Updating {newEpisodeThumbnailsCount} episode thumbnails operation completed successfully",
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies AppRouteSchema;
