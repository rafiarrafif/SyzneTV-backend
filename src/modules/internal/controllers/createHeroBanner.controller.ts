import { Context, Static } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createHeroBannerService } from "../services/http/createHeroBanner.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";
import { createHeroBannerSchema } from "../schemas/createHeroBanner.schema";

/**
 * Create a new hero banner.
 *
 * This controller handles the creation of a hero banner by accepting the necessary
 * data in the request body, invoking the service to create the banner, and returning
 * an created payload response.
 *
 * See OpenAPI documentation for request/response schema.
 */
export const createHeroBannerController = async (ctx: {
  set: Context["set"];
  body: Static<typeof createHeroBannerSchema.body>;
}) => {
  try {
    const createdBanner = await createHeroBannerService(ctx.body);
    return returnWriteResponse(ctx.set, 201, "Hero banner created successfully", createdBanner);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
