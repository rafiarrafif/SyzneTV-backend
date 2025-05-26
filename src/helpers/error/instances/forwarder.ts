import { AppError } from "./app";

export function ErrorForwarder(
  statusCode: number,
  message: string,
  cause: unknown
): never {
  if (cause instanceof AppError) {
    throw cause;
  }

  throw new AppError(statusCode, message, cause);
}
