import { t, type RouteSchema } from "elysia";
import type { OpenAPIV3 } from "openapi-types";

export type AppRouteSchema = RouteSchema & {
  detail?: Partial<{
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: OpenAPIV3.ExternalDocumentationObject;
    operationId?: string;
    parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[];
    requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject;
    responses: OpenAPIV3.ResponsesObject;
    callbacks?: {
      [callback: string]:
        | OpenAPIV3.ReferenceObject
        | OpenAPIV3.CallbackObject;
    };
    deprecated?: boolean;
    security?: OpenAPIV3.SecurityRequirementObject[];
    servers?: OpenAPIV3.ServerObject[];
  }>;
};