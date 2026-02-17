import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { checkUserSessionRepository } from "../../repositories/checkUserSession.repository";

export const checkUserSessionInDBService = async (
  sessionId: string,
): Promise<boolean> => {
  try {
    const dbValidationResult = await checkUserSessionRepository(sessionId);
    return dbValidationResult ? true : false;
  } catch (error) {
    ErrorForwarder(error);
  }
};
