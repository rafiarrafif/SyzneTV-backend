import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const removeItemFromCollectionBySytemSchema = {
  headers: t.Object({
    cookie: t.String({ description: "Authentication token in cookie format, e.g., auth_token=your_jwt_token;" }),
  }),
  body: t.Object({
    name: t.String({ description: "Name of the collection to which the item will be added" }),
    itemId: t.String({ description: "ID of the item to be added to the collection", examples: ["12345"] }),
  }),
  detail: {
    summary: "Remove an item from a collection",
    description: "Removes a specified item from a collection identified by its name.",
    responses: {
      200: {
        description: "The item was successfully removed from the collection.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: true },
                status: { type: "number", example: 200 },
                message: { type: "string", example: "Item removed from collection successfully" },
              },
            },
          },
        },
      },
    },
  },
} satisfies AppRouteSchema;
