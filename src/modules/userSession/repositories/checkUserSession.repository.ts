import { AppError } from "../../../helpers/error/instances/app";
import { userSessionModel } from "../userSession.model";

export const checkUserSessionRepository = async (sessionId: string) => {
  try {
    return await userSessionModel.findUnique({
      where: {
        id: sessionId,
        isAuthenticated: true,
        deletedAt: null,
      },
    });
  } catch (error) {
    throw new AppError(500, "Database error during session validation", error);
  }
};
