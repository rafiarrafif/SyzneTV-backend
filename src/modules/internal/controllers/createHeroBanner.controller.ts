import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createHeroBannerService } from "../services/http/createHeroBanner.service";
import { returnWriteResponse } from "../../../helpers/callback/httpResponse";

export interface CreateHeroBannerRequestBody {
  isClickable?: boolean;
  title?: string;
  tags: string[];
  description?: string;
  buttonContent?: string;
  buttonLink?: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
}

export const createHeroBannerController = async (ctx: Context & { body: CreateHeroBannerRequestBody }) => {
  try {
    const createdBanner = await createHeroBannerService(ctx.body);
    return returnWriteResponse(ctx.set, 201, "Hero banner created successfully", createdBanner);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
