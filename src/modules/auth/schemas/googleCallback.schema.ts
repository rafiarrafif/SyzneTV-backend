import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const googleCallbackSchema = {
  headers: t.Object({
    "x-client-info": t.String({
      examples: [
        '{"os":"Windows","osVersion":"10","browser":"Chrome","browserVersion":"89.0.4389.82","deviceType":"Desktop","ip":"192.168.1.1"}',
      ],
    }),
  }),
  query: t.Object({
    code: t.String({ examples: ["4/0AY0e-xxxxxxxxx"] }),
    state: t.String({ examples: ["random_state_string"] }),
    callbackURI: t.String({ examples: ["https://example.com/auth/google/callback"] }),
  }),
  detail: {
    summary: "Google OAuth callback endpoint",
    description:
      "Handles the callback from Google OAuth and processes the authentication response. This endpoint also processes the account provisioning if the user is logging in for the first time.",
    responses: {
      200: {
        description: "Authentication successful",
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
                  example: "Authentication successful",
                },
                data: {
                  type: "object",
                  properties: {
                    authToken: {
                      type: "string",
                      description: "JWT token for authenticated user",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
