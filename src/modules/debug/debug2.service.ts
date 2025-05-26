import { ErrorForwarder } from "../../helpers/error/instances/forwarder";
import { debug3Service } from "./debug3.service";

export const debug2Service = async () => {
  try {
    const dataFromService = await debug3Service();
    return dataFromService;
  } catch (error) {
    ErrorForwarder(402, "Error from 2", error);
  }
};
