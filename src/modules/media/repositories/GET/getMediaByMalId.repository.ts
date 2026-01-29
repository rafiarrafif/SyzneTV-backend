import { AppError } from "../../../../helpers/error/instances/app";
import { mediaModel } from "../../model";

export const getMediaByMalIdRepository = async (mal_id: number) => {
  try {
    return await mediaModel.findUnique({
      where: { malId: mal_id },
    });
  } catch (err) {
    throw new AppError(500, "Failed to get media by MAL ID", err);
  }
};
