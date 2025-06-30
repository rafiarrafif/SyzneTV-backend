import { AppError } from "../../error/instances/app";
import bcrypt from "bcrypt";

export const comparePassword = async (
  providedPassword: string,
  storedPassword: string
) => {
  try {
    // Compare the provided password with the stored password
    return bcrypt.compare(providedPassword, storedPassword);
  } catch (error) {
    throw new AppError(401, "Invalid credentials", error);
  }
};
