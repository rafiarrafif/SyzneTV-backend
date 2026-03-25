import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const createHeroBannerSchema = {
  body: t.Object({
    orderPriority: t.Optional(
      t.Number({ description: "The priority order of the hero banner. Lower numbers indicate higher priority." }),
    ),
    mediaId: t.String({ description: "The ID of the media associated with the hero banner" }),
    imageUrl: t.Optional(
      t.String({
        description:
          "The URL of the image used in the hero banner. If not provided, a thumbnail image of the media will be used.",
      }),
    ),
    startDate: t.Date({ description: "The start date for the hero banner in ISO 8601 format" }),
    endDate: t.Date({ description: "The end date for the hero banner in ISO 8601 format" }),
  }),
  detail: {
    summary: "Create a new hero banner",
    description:
      "Perform creation of a new hero banner. This operation adds a new hero banner to the database based on the provided data.",
    responses: {
      201: {
        description: "Hero banner created successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 201 },
                message: { type: "string", default: "Hero banner created successfully" },
                data: {
                  type: "object",
                  description:
                    "The created hero banner object. This field is returned only if the environment is running in development mode.",
                  properties: {
                    id: { type: "string", description: "The ID of the created hero banner" },
                    orderPriority: {
                      type: "number",
                      description: "The priority order of the hero banner. Lower numbers indicate higher priority.",
                    },
                    mediaId: { type: "string", description: "The ID of the media associated with the hero banner" },
                    imageUrl: {
                      type: "string",
                      description:
                        "The URL of the image used in the hero banner. If not provided, a thumbnail image of the media will be used.",
                    },
                    startDate: {
                      type: "string",
                      format: "date-time",
                      description: "The start date for the hero banner in ISO 8601 format",
                    },
                    endDate: {
                      type: "string",
                      format: "date-time",
                      description: "The end date for the hero banner in ISO 8601 format",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "The timestamp when the hero banner was created",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      description: "The timestamp when the hero banner was last updated",
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
