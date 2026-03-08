import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const createVideoServiceInternalSchema = {
  body: t.Object({
    name: t.String({
      description: "The name of the video service",
    }),
    domain: t.String({
      description: "The domain of the video service",
    }),
    logo: t.String({
      description: "The logo URL of the video service",
    }),
    hexColor: t.String({
      description: "The hex color associated with the video service",
    }),
    endpointVideo: t.String({
      description: "The endpoint URL for video streaming",
    }),
    endpointThumbnail: t.String({
      description: "The endpoint URL for thumbnails",
    }),
    endpointDownload: t.Optional(
      t.String({
        description: "The endpoint URL for downloads",
      }),
    ),
  }),
  detail: {
    summary: "Create a new video service",
    description:
      "Perform creation of a new video service. This operation adds a new video service to the database based on the provided data.",
    responses: {
      201: {
        description: "Video service created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 201 },
                message: { type: "string", default: "Video service created" },
                data: {
                  type: "object",
                  description:
                    "The created video service object. This field is returned only if the environment is running in development mode.",
                  properties: {
                    id: { type: "string", description: "The ID of the created video service" },
                    name: { type: "string", description: "The name of the video service" },
                    domain: { type: "string", description: "The domain of the video service" },
                    logo: { type: "string", description: "The logo URL of the video service" },
                    hexColor: { type: "string", description: "The hex color associated with the video service" },
                    endpointVideo: { type: "string", description: "The endpoint URL for video streaming" },
                    endpointThumbnail: { type: "string", description: "The endpoint URL for thumbnails" },
                    endpointDownload: {
                      type: "string",
                      description:
                        "The endpoint URL for downloads. This field is optional and may be null if not provided.",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "The timestamp when the video service was created",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      description: "The timestamp when the video service was last updated",
                    },
                    deletedAt: {
                      type: "string",
                      format: "date-time",
                      description:
                        "The timestamp when the video service was deleted. This field is null if the video service is not deleted.",
                    },
                    createdBy: {
                      type: "string",
                      description:
                        "The ID of the account that created the video service (filled with the system account ID)",
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
