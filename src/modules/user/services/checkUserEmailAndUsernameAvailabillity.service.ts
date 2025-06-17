import { Prisma } from "@prisma/client";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { checkUserEmailAndUsernameAvailabillityRepo } from "../repositories/checkUserEmailAndUsernameAvailabillity.repository";

export const checkUserEmailAndUsernameAvailabillityService = async (
  payload: Prisma.UserUpdateInput,
  idException: string
) => {
  try {
    const usernameAndEmailAvailabillity =
      checkUserEmailAndUsernameAvailabillityRepo(
        idException!,
        payload.username as string,
        payload.email as string
      );
    return usernameAndEmailAvailabillity;
  } catch (error) {
    ErrorForwarder(error);
  }
};
