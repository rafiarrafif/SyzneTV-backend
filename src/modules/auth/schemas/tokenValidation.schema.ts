import { t } from "elysia";
import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const tokenValidationSchema = {
  headers: t.Object({
    cookie: t.String({ description: "Authentication token in cookie format, e.g., auth_token=your_jwt_token;" }),
  }),
  detail: {
    summary: "Validate authentication JWT token",
    description:
      "Validates the provided authentication JWT token with checking its validity and expiration in redis cache, if not exists, it will be checked in the database. If the token is valid, it returns the user information associated with the token. if the token is invalid or expired, it returns an error message.",
    responses: {
      200: {
        description: "Validation successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "string", description: "Session ID", default: "xxxx-xxxxx-xxxxx-xxxx" },
                isAuthenticated: {
                  type: "boolean",
                  description: "Indicates if the token is valid and the user is authenticated",
                  default: true,
                },
                validUntil: {
                  type: "string",
                  format: "date-time",
                  description: "Expiration date and time of the token",
                  default: "2024-12-31T23:59:59Z",
                },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string", description: "User ID", default: "user-12345" },
                    name: { type: "string", description: "User's full name", default: "Lena Nouzen" },
                    email: {
                      type: "string",
                      format: "email",
                      description: "User's email address",
                      default: "lena@example.com",
                    },
                    username: { type: "string", description: "User's username", default: "vladilena" },
                    avatar: {
                      type: "string",
                      format: "uri",
                      description: "URL to the user's avatar image",
                      default: "https://example.com/avatar.jpg",
                    },
                    birthDate: {
                      type: "string",
                      format: "date",
                      description: "User's birth date, can be null if not provided",
                      default: null,
                    },
                    bioProfile: {
                      type: "string",
                      description: "User's bio/profile description, can be null if not provided",
                      default: null,
                    },
                    preference: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "Preference ID", default: "pref-12345" },
                        userId: { type: "string", description: "Associated User ID", default: "user-12345" },
                        langPreference: {
                          type: "string",
                          description: "User's language preference, can be null if not provided",
                          default: null,
                        },
                        adultFiltering: {
                          type: "string",
                          description: "User's adult content filtering setting",
                          default: "strict",
                        },
                        adultAlert: {
                          type: "string",
                          description: "User's adult content alert setting",
                          default: "enabled",
                        },
                        videoQuality: {
                          type: "string",
                          description: "User's preferred video quality setting",
                          default: "1080p",
                        },
                        serviceDefaultId: {
                          type: "string",
                          description: "Default service ID for the user, can be null if not provided",
                          default: null,
                        },
                        hideContries: {
                          type: "array",
                          items: { type: "string" },
                          description: "List of country codes that the user has chosen to hide content from",
                          default: ["US", "CN"],
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
  },
} satisfies AppRouteSchema;
