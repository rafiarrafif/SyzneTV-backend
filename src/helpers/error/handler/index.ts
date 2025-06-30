import { Context } from "elysia";
import { Prisma } from "@prisma/client";
import { returnErrorResponse } from "../../callback/httpResponse";
import { AppError } from "../instances/app";
import { PrismaErrorCodeList } from "../../../utils/databases/prisma/error/codeList";

export const mainErrorHandler = (set: Context["set"], error: unknown) => {
  if (error instanceof AppError) {
    return returnErrorResponse(
      set,
      error.statusCode,
      error.message,
      error.details
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorInfo = PrismaErrorCodeList[error.code];

    if (errorInfo)
      return returnErrorResponse(
        set,
        errorInfo.status,
        errorInfo.message,
        error.meta ?? {}
      );
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return returnErrorResponse(set, 500, "Unknown database error");
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return returnErrorResponse(
      set,
      500,
      "Database engine crashed unexpectedly"
    );
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return returnErrorResponse(set, 503, `Can't reach database server.`, error);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return returnErrorResponse(
      set,
      400,
      "Invalid input to query",
      error.message
    );
  }

  return returnErrorResponse(set, 500, "Internal server error", error);
};
