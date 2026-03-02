import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const findAllActiveHeroBannerRepository = async () => {
  try {
    return await prisma.heroBanner.findMany({
      where: {
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
      orderBy: [
        {
          orderPriority: "asc",
        },
        {
          startDate: "asc",
        },
      ],
    });
  } catch (error) {
    throw new AppError(500, "Failed to fetch active hero banners", error);
  }
};
