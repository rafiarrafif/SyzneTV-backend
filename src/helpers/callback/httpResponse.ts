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
export function returnWriteResponse(
  set: any,
  status: number,
  message?: string,
  data?: any
) {
  set.status = status;

  const response: Record<string, any> = {
    status,
    message,
  };
  if (process.env.APP_ENV === "development") response.data = data;

  return response;
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
export function returnReadResponse(
  set: any,
  status: number,
  message: string,
  data: any
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
export function returnErrorResponse(
  set: any,
  status: number,
  message: string,
  errorDetails?: any
) {
  set.status = status;

  const response: Record<string, any> = {
    status: "error",
    message,
  };
  if (process.env.APP_ENV === "development" && errorDetails)
    response.error_details = errorDetails;

  return response;
}
