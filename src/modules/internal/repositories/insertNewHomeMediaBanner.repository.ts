import { AppError } from "../../../helpers/error/instances/app";
import { prisma } from "../../../utils/databases/prisma/connection";
import { SystemAccountId } from "../../../config/account/system";

export const insertNewHomeMediaBannerRepository = async ({
  mediaId,
  startShow,
  endShow,
  priority,
}: {
  mediaId: string;
  startShow: Date;
  endShow: Date;
  priority?: number;
}) => {
  try {
    return await prisma.homeMediaBanner.create({
      data: {
        media_id: mediaId,
        start_show: startShow,
        end_show: endShow,
        priority,
        created_by_id: SystemAccountId,
      },
    });
  } catch (e) {
    throw new AppError(500, "An error occurred when trying to add media data to the home media banner", e);
  }
};
