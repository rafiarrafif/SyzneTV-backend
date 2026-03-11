import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const getCallbackProviderUrlSchema = {
  detail: {
    summary: "Get the callback URL of oauth provider",
    description:
      "After users have successfully completed the authentication process on the OAuth provider page, they will be redirected to the callback page on the frontend. This endpoint aims to obtain the actual endpoint for each OAuth response handler.",
    responses: {
      200: {
        description: "The callback URL on the provider has been found.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  default: true,
                },
                status: {
                  type: "number",
                  default: 200,
                },
                message: {
                  type: "string",
                  default: "The callback URL on the provider has been found.",
                },
                data: {
                  type: "object",
                  properties: {
                    callback_url: {
                      type: "string",
                      description: "The callback URL on the provider.",
                      example: "auth/google/callback",
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
