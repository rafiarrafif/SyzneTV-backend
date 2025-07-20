import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findUserRoleService } from "../internal/findUserRole.service";

export const findUserRoleByNameService = async (name: string) => {
  try {
    return await findUserRoleService({
      identifier: name,
      query_target: "name",
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
