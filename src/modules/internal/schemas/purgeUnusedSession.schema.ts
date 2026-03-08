import { AppRouteSchema } from "../../../helpers/types/AppRouteSchema";

export const purgeUnusedSessionSchema = {
  detail: {
    summary: "Purge all unused user sessions",
    description:
      "Perform purge of all unused user sessions. This operation deletes all user sessions from the database that are considered unused based on authentication status and deleted status. This helps in maintaining a clean session store and improving security by removing stale sessions.",
    responses: {
      200: {
        description: "Unused user sessions purged successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", default: true },
                status: { type: "integer", default: 200 },
                message: { type: "string", default: "Successfully purged all unused user sessions" },
                data: {
                  type: "object",
                  description:
                    "An object containing details about the purge operation. This field is returned only if the environment is running in development mode.",
                  properties: {
                    count: { type: "integer", description: "The number of user sessions that were purged" },
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
