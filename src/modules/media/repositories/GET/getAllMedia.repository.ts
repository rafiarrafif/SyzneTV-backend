import { AppError } from "../../../../helpers/error/instances/app";
import { mediaModel } from "../../model";

export const getAllMediaRepository = async (page: number) => {
  try {
    const limit = 10;
    return await mediaModel.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to get all media from repository", error);
  }
};
