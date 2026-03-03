import { Context } from "elysia";
import { mainErrorHandler } from "../../../helpers/error/handler";
import { createHeroBannerService } from "../services/http/createHeroBanner.service";

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

export const createHeroBannerController = async (
  ctx: Context & { body: CreateHeroBannerRequestBody },
) => {
  try {
    return await createHeroBannerService(ctx.body);
  } catch (error) {
    return mainErrorHandler(ctx.set, error);
  }
};
