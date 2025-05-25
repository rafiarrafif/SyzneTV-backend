import { AppError } from "../../helpers/error/instances/app";

export const debugService = () => {
  //   return "OK2";
  throw new AppError(404, "not found");
};
