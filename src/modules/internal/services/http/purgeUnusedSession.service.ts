import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { deleteAllUnusedUserSessionRepository } from "../../repositories/deleteAllUnusedUserSession.repository";

export const purgeUnusedSessionService = async () => {
  try {
    return await deleteAllUnusedUserSessionRepository();
  } catch (error) {
    ErrorForwarder(error);
  }
};
