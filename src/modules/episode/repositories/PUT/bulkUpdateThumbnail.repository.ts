import { Prisma } from "@prisma/client";
import { AppError } from "../../../../helpers/error/instances/app";
import { prisma } from "../../../../utils/databases/prisma/connection";

export const bulkUpdateThumbnailRepository = async (
  data: { episodeId: string; thumbnailCode: string }[],
) => {
  try {
    const values = Prisma.join(
      data.map(
        (item) => Prisma.sql`(${item.episodeId}::uuid, ${item.thumbnailCode})`,
      ),
    );

    await prisma.$executeRaw`
    UPDATE episodes e
    SET "pictureThumbnail" = v."thumbnailCode"
    FROM (
      VALUES ${values}
    ) AS v("episodeId", "thumbnailCode")
    WHERE e.id = v."episodeId"
  `;
  } catch (error) {
    throw new AppError(
      500,
      "An error occurred while bulk updating episode thumbnails.",
      error,
    );
  }
};
