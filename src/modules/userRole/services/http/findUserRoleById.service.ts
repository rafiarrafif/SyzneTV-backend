import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { findUserRoleService } from "../internal/findUserRole.service";

export const findUserRoleByIdService = async (id: string) => {
  try {
    return await findUserRoleService({
      identifier: id,
      query_target: "id",
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
