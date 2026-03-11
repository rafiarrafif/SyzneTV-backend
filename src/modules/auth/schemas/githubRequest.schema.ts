import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const githubRequestSchema = {
  query: t.Object({
    callback: t.Optional(
      t.String({
        description: "The callback URL to redirect after GitHub authentication. It should be URL-encoded if provided.",
      }),
    ),
  }),
  detail: {
    summary: "Initiate GitHub OAuth flow",
    description:
      "This endpoint initiates the GitHub OAuth flow by redirecting the user to GitHub's authentication page.",
    responses: {
      200: {
        description: "GitHub login URL created successfully.",
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
                  default: "GitHub login URL created successfully.",
                },
                data: {
                  type: "object",
                  properties: {
                    endpointUrl: {
                      type: "string",
                      description: "The URL to redirect the user for GitHub authentication.",
                      example:
                        "https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=user:email",
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
