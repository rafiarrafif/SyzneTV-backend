import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const findAllActiveHeroBannerRepository = async (userId?: string) => {
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
      select: {
        orderPriority: true,
        imageUrl: true,
        media: {
          select: {
            id: true,
            title: true,
            slug: true,
            pictureLarge: true,
            synopsis: true,
            genres: {
              select: {
                slug: true,
                name: true,
              },
            },
            _count: {
              select: {
                inCollections: {
                  where: {
                    collection: {
                      ownerId: userId,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Failed to fetch active hero banners", error);
  }
};
