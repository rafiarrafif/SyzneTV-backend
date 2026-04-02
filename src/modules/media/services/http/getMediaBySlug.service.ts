import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { selectMediaBySlugRepository } from "../../repositories/SELECT/selectMediaBySlug.repository";

export const getMediaBySlugService = async (slug: string) => {
  try {
    const mediaData = await selectMediaBySlugRepository(slug);
    if (!mediaData) throw new AppError(404, "Media not found with the provided slug.");

    return mediaData;
  } catch (error) {
    ErrorForwarder(error);
  }
};
