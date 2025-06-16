import { Prisma } from "@prisma/client";
import { jwtDecode } from "../../../helpers/http/jwt/decode";
import { AppError } from "../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../helpers/error/instances/forwarder";
import { updateUserRepo } from "../repositories/updateUser.repository";

export const editUserService = async (
  identifier: string,
  cookie: string,
  payload: Prisma.UserUncheckedCreateInput
) => {
  try {
    // Decode the JWT token and verify the user, if the user is not the same as the identifier, throw an error
    const jwtSession = jwtDecode(cookie);
    if (jwtSession.user.username !== identifier) {
      throw new AppError(401, "Unauthorized");
    }

    const updateUser = updateUserRepo(identifier, payload);
    return updateUser;
  } catch (error) {
    ErrorForwarder(error, 500, "Internal server error");
  }
};
