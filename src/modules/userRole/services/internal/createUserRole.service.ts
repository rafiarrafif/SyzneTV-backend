import { AppError } from "../../../../helpers/error/instances/app";
import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { createUserRoleRepository } from "../../repositories/createUserRole.repository";
import {
  createUserRoleRepositoryPayload,
  createUserRoleServicePayload,
} from "../../userRole.types";

export const createUserRoleService = async (
  payload: createUserRoleServicePayload
) => {
  try {
    const repositoryMap = {
      withAdmin: createUserRoleRepository,
    };

    const repoFn = repositoryMap[payload.queryTarget];
    if (!repoFn) throw new AppError(503, "Repository handler not found");

    /**
     * TO-DO!!
     *
     * Create a function to handle storing image in here!
     */

    const userRoleData = await repoFn(
      payload.formInput as createUserRoleRepositoryPayload // CHANGE THIS AFTER CREATE STORE IMAGE FUNCTION
    );
    return userRoleData;
  } catch (error) {
    ErrorForwarder(error);
  }
};
