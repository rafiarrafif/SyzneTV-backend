import { AppError } from "./app";

export function ErrorForwarder(
  cause: unknown,
  statusCode: number = 500,
  message: string = "Unexpected error"
): never {
  if (cause instanceof AppError) {
    throw cause;
  }

  throw new AppError(statusCode, message, cause);
}
