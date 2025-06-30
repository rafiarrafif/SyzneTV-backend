import { AppError } from "../../error/instances/app";
import bcrypt from "bcrypt";

export const comparePassword = async (
  passwordInput: string,
  passwordRaw: string
) => {
  try {
    return bcrypt.compare(passwordInput, passwordRaw);
  } catch (error) {
    throw new AppError(401, "Invalid credentials", error);
  }
};
