import { AppError } from "../../../helpers/error/instances/app";
import { findUniqueUserSessionInDBRepo } from "../repositories/findUniqueUserSessionInDB.repository";

export const getUserSessionService = async (identifier: string) => {
  try {
    const userSession = await findUniqueUserSessionInDBRepo(identifier);
    return userSession;
  } catch (error) {
    throw new AppError(401, "Unable to get user session", error);
  }
};
