import { AppError } from "../../helpers/error/instances/app";
import { ErrorForwarder } from "../../helpers/error/instances/forwarder";

export const debug3Service = async () => {
  // throw new AppError(402, "Error from 3");
  const data = "RAWR";
  // return data;
  ErrorForwarder(data);
};
