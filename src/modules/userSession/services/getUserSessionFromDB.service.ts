import { AppError } from "../../../helpers/error/instances/app";
import { findUniqueUserSessionInDBRepo } from "../repositories/findUniqueUserSessionInDB.repository";

export const getUserSessionFromDBService = async (identifier: string) => {
  try {
    // Check is session exists in DB
    const userSession = await findUniqueUserSessionInDBRepo(identifier);

    // If session not found, return false
    if (
      !userSession ||
      !userSession.isAuthenticated ||
      new Date(userSession.validUntil) < new Date()
    )
      return false;

    // If session found, return it
    return userSession;
  } catch (error) {
    // If any DB error occurs, throw an AppError
    throw new AppError(401, "Unable to get user session", error);
  }
};
