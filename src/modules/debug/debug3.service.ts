import { AppError } from "../../helpers/error/instances/app";

export const debug3Service = async () => {
  throw new AppError(402, "Error from 3");
};
