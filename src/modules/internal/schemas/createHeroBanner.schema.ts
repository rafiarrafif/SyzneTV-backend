import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const createHeroBannerSchema = {
  body: t.Object({
    isClickable: t.Optional(
      t.Boolean({
        description: "Indicates whether the hero banner is clickable",
      }),
    ),
    title: t.Optional(
      t.String({
        description: "The title of the hero banner",
      }),
    ),
    tags: t.Array(t.String(), {
      description: "An array of tags associated with the hero banner",
    }),
    description: t.Optional(
      t.String({
        description: "A brief description of the hero banner",
      }),
    ),
    buttonContent: t.Optional(
      t.String({
        description: "The text content of the button on the hero banner",
      }),
    ),
    buttonLink: t.Optional(
      t.String({
        description: "The URL that the button on the hero banner links to",
      }),
    ),
    imageUrl: t.Optional(
      t.String({
        description: "The URL of the image used in the hero banner",
      }),
    ),
    startDate: t.String({
      description: "The start date for the hero banner in ISO 8601 format",
    }),
    endDate: t.String({
      description: "The end date for the hero banner in ISO 8601 format",
    }),
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
                    isClickable: { type: "boolean", description: "Indicates whether the hero banner is clickable" },
                    title: { type: "string", description: "The title of the hero banner" },
                    tags: {
                      type: "array",
                      items: { type: "string" },
                      description: "An array of tags associated with the hero banner",
                    },
                    description: { type: "string", description: "A brief description of the hero banner" },
                    buttonContent: { type: "string", description: "The text content of the button on the hero banner" },
                    buttonLink: { type: "string", description: "The URL that the button on the hero banner links to" },
                    imageUrl: { type: "string", description: "The URL of the image used in the hero banner" },
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
