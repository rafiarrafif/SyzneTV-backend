import { findUserByEmailRepository } from "../../repositories/read/findUserByEmail.repository";
import { getUserDataService } from "../../user.types";
import { AppError } from "../../../../helpers/error/instances/app";
import { findUserByIdRepository } from "../../repositories/read/findUserById.repository";
import { findUserByUsernameRepository } from "../../repositories/read/findUserByUsername.repository";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";

export const findUserService = async (payload: getUserDataService) => {
  try {
    const repositoryMap = {
      id: findUserByIdRepository,
      email: findUserByEmailRepository,
      username: findUserByUsernameRepository,
    } as const;

    const repoFn = repositoryMap[payload.queryTarget];
    if (!repoFn) throw new AppError(502, "Repository handler not found");

    return await repoFn(payload.identifier);
  } catch (error) {
    ErrorForwarder(error);
  }
};
