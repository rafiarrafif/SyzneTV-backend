import { ElysiaOpenAPIConfig } from "@elysiajs/openapi";

export const openAPIConfig: ElysiaOpenAPIConfig = {
  documentation: {
    info: {
      title: "TV Nounoz API",
      description: "API documentation for TV Nounoz backend services",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Internal",
        description:
          "Endpoints for internal use, such as administrative tasks and data management operations. These endpoints may require authentication and are not intended for public use.",
      },
    ],
  },
};
