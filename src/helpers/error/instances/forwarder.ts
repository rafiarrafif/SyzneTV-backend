import { Prisma } from "@prisma/client";
import { AppError } from "./app";

export function ErrorForwarder(
  cause: unknown,
  statusCode: number = 500,
  message: string = "Unexpected error"
): never {
  if (
    cause instanceof AppError ||
    cause instanceof Prisma.PrismaClientKnownRequestError ||
    cause instanceof Prisma.PrismaClientUnknownRequestError ||
    cause instanceof Prisma.PrismaClientRustPanicError ||
    cause instanceof Prisma.PrismaClientInitializationError ||
    cause instanceof Prisma.PrismaClientValidationError
  ) {
    throw cause;
  }

  throw new AppError(statusCode, message, cause);
}
