import { Context } from "elysia";

/**
 * Returns a standardized response for write operations (POST, PUT, DELETE).
 * Only includes data in the response during development.
 *
 * @param set - Function to set HTTP headers.
 * @param status - HTTP status code of the response.
 * @param message - A message describing the result.
 * @param data - Optional data for success responses or error description (only returned in development).
 *
 * @returns An object with `status`, `message`, and optionally `data` (in development only).
 */
export function returnWriteResponse<T>(
  set: Context["set"],
  status: number,
  message?: string,
  data?: T
) {
  set.status = status;

  return {
    status,
    message,
    ...(process.env.APP_ENV === "development" && { data }),
  };
}

/**
 * Returns a standardized response for read operations (GET).
 * Always includes data in the response regardless of the environment.
 *
 * @param set - Function to set HTTP headers.
 * @param status - HTTP status code of the response.
 * @param message - A message describing the result.
 * @param data - Data to include in the response.
 *
 * @returns An object with `status`, `message`, and `data`.
 */
export function returnReadResponse<T>(
  set: Context["set"],
  status: number,
  message: string,
  data: T
) {
  set.status = status;
  return {
    status,
    message,
    data,
  };
}

/**
 * Returns a standardized error response for handling errors in catch blocks.
 *
 * @param set - Function to set HTTP headers.
 * @param status - HTTP status code of the error response.
 * @param message - A message describing the error.
 * @param errorDetails - Optional, detailed information about the error (e.g., stack trace).
 *
 * @returns An object with `status`, `message`, and optionally `error_details` (in development only).
 */
export function returnErrorResponse<T>(
  set: Context["set"],
  status: number,
  message: string,
  errorDetails?: T
) {
  set.status = status;

  return {
    status: "error",
    message,
    ...(process.env.APP_ENV === "development" &&
      errorDetails && {
        error_details: errorDetails,
      }),
  };
}
