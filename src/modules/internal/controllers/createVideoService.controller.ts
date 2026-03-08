import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { createVideoServiceInternalService } from "../services/http/createVideoService.service";
import { createVideoServiceInternalSchema } from "../schemas/createVideoServiceInternal.schema";

/**
 * Controller for creating a new video service.
 *
 * This controller handles the HTTP request for creating a new video service.
 * It validates the incoming request body against the defined schema,
 * invokes the service layer to perform the creation logic,
 * and returns an appropriate HTTP response based on the outcome of the operation.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const createVideoServiceInternalController = async (ctx: {
  set: Context["set"];
  body: Static<typeof createVideoServiceInternalSchema.body>;
}) => {
  try {
    const createdVideoService = await createVideoServiceInternalService(ctx.body);
    return returnWriteResponse(ctx.set, 201, "Video service created", createdVideoService);
  } catch (error) {
    throw mainErrorHandler(ctx.set, error);
  }
};
