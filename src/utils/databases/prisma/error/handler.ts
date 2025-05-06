import { Prisma } from "@prisma/client";
import { PrismaErrorCodeList } from "./codeList";
import { PrismaErrorTypes } from "./types";

/**
 * Handles Prisma-specific errors and returns a structured response.
 *
 * This helper is designed to standardize error handling for Prisma operations
 * and provide clear differentiation between client-side and server-side errors.
 *
 * It maps known Prisma errors to HTTP status codes and human-readable messages,
 * allowing consistent and centralized error handling across the application.
 *
 * ### Supported Error Codes:
 * - P2002: Duplicate field detected.
 * - P2025: Record not found.
 * - P2003: Foreign key constraint failed
 * - Validation errors handled via `PrismaClientValidationError`.
 *
 * @param {unknown} error - The error thrown by a Prisma operation.
 * @returns {ErrorResponse} A structured error response object.
 */
export const handlePrismaError = (error: unknown): PrismaErrorTypes => {
  // Check for Prisma known request errors (e.g., P2002, P2025)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const mappedError = PrismaErrorCodeList[error.code];
    if (mappedError) {
      return {
        status: mappedError.status,
        message: mappedError.message,
        details: error.meta,
      };
    }
  }

  // Handle Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 400,
      message: "Validation failed",
      details: error.message,
    };
  }

  // Fallback for unknown errors (typically server errors)
  return {
    status: 500,
    message: "An unexpected error occurred",
    details: error,
  };
};
