import { ErrorForwarder } from "../../../../helpers/error/instances/forwarder";
import { createUserRoleServicePayload } from "../../userRole.types";
import { createUserRoleService } from "../internal/createUserRole.service";

export const createUserRoleWIthAdminService = async (
  payload: createUserRoleServicePayload["formInput"]
) => {
  try {
    return await createUserRoleService({
      formInput: payload,
      queryTarget: "withAdmin",
    });
  } catch (error) {
    ErrorForwarder(error);
  }
};
