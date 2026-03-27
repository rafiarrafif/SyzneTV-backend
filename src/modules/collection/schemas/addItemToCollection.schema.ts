import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const addItemToCollectionSchema = {
  headers: t.Object({
    cookie: t.String({ description: "Authentication token in cookie format, e.g., auth_token=your_jwt_token;" }),
  }),
  params: t.Object({
    name: t.String({ description: "Name of the collection to which the item will be added" }),
  }),
  body: t.Object({
    itemId: t.String({ description: "ID of the item to be added to the collection", examples: ["12345"] }),
  }),
  detail: {
    summary: "Add an item to a collection",
    description: "Adds a specified item to a collection identified by its name.",
    responses: {
      200: {
        description: "The item was successfully added to the collection.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                status: { type: "number", example: 200 },
                message: { type: "string", example: "Item added to collection successfully" },
              },
            },
          },
        },
      },
    },
  },
} satisfies AppRouteSchema;
