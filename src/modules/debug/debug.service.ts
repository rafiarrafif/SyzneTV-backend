import { ErrorForwarder } from "../../helpers/error/instances/forwarder";
import { debug2Service } from "./debug2.service";

export const debugService = async () => {
  try {
    const dataFromService = await debug2Service();
    return dataFromService;
  } catch (error) {
    ErrorForwarder(error);
  }
};
