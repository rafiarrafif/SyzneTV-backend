import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const getAllMediaSchema = {
  query: t.Object({
    page: t.String({ description: "The page number for pagination", default: "1" }),
  }),
  detail: {
    summary: "Fetch all media items with pagination",
    description:
      "Fetch a paginated list of all media items. The 'page' query parameter can be used to specify the page number for pagination.",
    responses: {
      200: {
        description: "Media items fetched successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                status: { type: "number", example: 200 },
                message: { type: "string", example: "Media fetched successfully" },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "Finished Airing" },
                      id: { type: "string", example: "12345" },
                      title: { type: "string", example: "Example Media Title" },
                      slug: { type: "string", example: "example-media-title" },
                      malId: { type: "number", example: 67890 },
                      pictureMedium: { type: "string", example: "https://example.com/medium.jpg" },
                      pictureLarge: { type: "string", example: "https://example.com/large.jpg" },
                      country: { type: "string", example: "JP" },
                      score: { type: "number", example: 8.5 },
                      startAiring: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z" },
                      endAiring: { type: "string", format: "date-time", example: "2023-12-31T23:59:59Z" },
                      synopsis: { type: "string", example: "This is an example synopsis of the media item." },
                      ageRating: { type: "string", example: "PG-13" },
                      mediaType: { type: "string", example: "Anime" },
                      source: { type: "string", example: "Manga" },
                      onDraft: { type: "boolean", example: false },
                      uploadedBy: { type: "string", example: "admin" },
                      deletedAt: { type: "string", format: "date-time", nullable: true, example: null },
                      createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z" },
                      updatedAt: { type: "string", format: "date-time", example: "2023-01-02T00:00:00Z" },
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
