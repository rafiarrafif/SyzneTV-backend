import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const showHeroBannerToHomePageRepository = async () => {
  try {
    return await prisma.homeMediaBanner.findMany({
      where: {
        start_show: {
          lte: new Date(),
        },
        end_show: {
          gte: new Date(),
        },
      },
      orderBy: {
        priority: "asc",
        created_at: "desc",
      },
      select: {
        id: true,
        media: {
          select: {
            title: true,
            synopsis: true,
            large_image_url: true,
            genres: {
              select: {
                genre: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new AppError(500, "Error fetching hero banner data", error);
  }
};
