import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const googleRequestSchema = {
  query: t.Object({
    callback: t.Optional(
      t.String({
        description: "The callback URL to redirect after Google authentication. It should be URL-encoded if provided.",
      }),
    ),
  }),
  detail: {
    summary: "Initiate Google OAuth flow",
    description:
      "This endpoint initiates the Google OAuth flow by redirecting the user to Google's authentication page.",
    responses: {
      200: {
        description: "Google login URL created successfully.",
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
                  default: "Google login URL created successfully.",
                },
                data: {
                  type: "object",
                  properties: {
                    endpointUrl: {
                      type: "string",
                      description: "The URL to redirect the user for Google authentication.",
                      example:
                        "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile",
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
