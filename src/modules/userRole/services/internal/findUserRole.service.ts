import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findUserRoleByIdRepository } from "../../repositories/findUserRoleById.repository";
import { findUserRoleByNameRepository } from "../../repositories/findUserRoleByName.repository";
import { findUserRolePayload } from "../../userRole.types";

export const findUserRoleService = async (payload: findUserRolePayload) => {
  try {
    const repositoryMap = {
      id: findUserRoleByIdRepository,
      name: findUserRoleByNameRepository,
    };

    const repoFn = repositoryMap[payload.query_target];
    if (!repoFn) throw new AppError(503, "Repository handler not found");

    const userRoleData = await repoFn(payload.identifier);
    if (userRoleData) throw new AppError(404, "User role not found");
  } catch (error) {
    ErrorForwarder(error);
  }
};
