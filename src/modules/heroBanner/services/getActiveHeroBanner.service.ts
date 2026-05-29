import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { showHeroBannerToHomePageRepository } from "../repositories/READ/showHeroBannerToHomePage.repository";

export const getActiveHeroBannerService = async ({ cookie }: { cookie?: string }) => {
  try {
    const isHeroBannerEnabled = process.env.ENABLE_HERO_BANNER === "true";

    if (!isHeroBannerEnabled) throw new AppError(403, "Hero banner feature is disabled");

    return await showHeroBannerToHomePageRepository();
  } catch (error) {
    ErrorForwarder(error);
  }
};
