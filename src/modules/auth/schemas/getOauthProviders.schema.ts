import { success } from "zod";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const getOauthProvidersSchema = {
  detail: {
    summary: "Get all available oauth providers",
    description:
      "This endpoint returns a list of all available and active oauth providers that can be used for authentication.",
    responses: {
      200: {
        description: "Successfully retrieved the list of oauth providers",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                status: {
                  type: "number",
                  example: 200,
                },
                message: {
                  type: "string",
                  example: "Successfully retrieved the list of oauth providers",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "google",
                      },
                      icon: {
                        type: "string",
                        example: "logos:google-icon",
                      },
                      req_endpoint: {
                        type: "string",
                        example: "auth/google",
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
  },
} satisfies AppRouteSchema;
