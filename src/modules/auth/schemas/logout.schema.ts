import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const logoutSchema = {
  detail: {
    summary: "Logout endpoint",
    description: "Logs out the authenticated user by invalidating their session or token.",
    responses: {
      200: {
        description: "Logout successful",
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
                  example: "Logout successful",
                },
                data: {
                  type: "object",
                  description: "Details about the logout operation. This only returned in development environment.",
                  properties: {
                    id: {
                      type: "string",
                      example: "123e4567-e89b-12d3-a456-426614174000",
                    },
                    isAuthenticated: {
                      type: "boolean",
                      example: false,
                    },
                    validUntil: {
                      type: "string",
                      format: "date-time",
                      example: "2024-12-31T23:59:59Z",
                    },
                    userId: {
                      type: "string",
                      example: "user_12345",
                    },
                    deletedAt: {
                      type: "string",
                      format: "date-time",
                      example: "2024-01-02T12:00:00Z",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2024-01-01T12:00:00Z",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                      example: "2024-01-02T12:00:00Z",
                    },
                    deviceType: {
                      type: "string",
                      example: "Desktop",
                    },
                    deviceOs: {
                      type: "string",
                      example: "Windows 10",
                    },
                    deviceIp: {
                      type: "string",
                      example: "192.168.1.1",
                    },
                    browser: {
                      type: "string",
                      example: "Chrome 89.0.4389.82",
                    },
                    isOnline: {
                      type: "boolean",
                      example: false,
                    },
                    lastOnline: {
                      type: "string",
                      format: "date-time",
                      example: "2024-01-02T12:00:00Z",
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
