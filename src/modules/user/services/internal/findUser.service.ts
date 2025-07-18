import { User } from "@prisma/client";
import { findUserByEmailRepository } from "../../repositories/read/findUserByEmail.repository";
import { getUserDataService } from "../../user.types";
import { AppError } from "../../../../helpers/error/instances/app";
import { findUserByIdRepository } from "../../repositories/read/findUserById.repository";
import { findUserByUsernameRepository } from "../../repositories/read/findUserByUsername.repository";

export const findUserService = async (payload: getUserDataService) => {
  let userData: User | null = null;
  if (payload.queryTarget === "email") {
    userData = await findUserByEmailRepository(payload.identifier);
  }
  if (payload.queryTarget === "id") {
    userData = await findUserByIdRepository(payload.identifier);
  }
  if (payload.queryTarget === "username") {
    userData = await findUserByUsernameRepository(payload.identifier);
  }

  if (userData === null) throw new AppError(404, "User not found");

  return userData;
};
