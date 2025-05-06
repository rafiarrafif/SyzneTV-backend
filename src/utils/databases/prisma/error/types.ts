/**
 * @typedef {Object} ErrorResponse
 * @property {number} status - The HTTP status code corresponding to the error.
 * @property {string} message - A human-readable error message.
 * @property {any} [details] - Additional details about the error, if available.
 */
export interface PrismaErrorTypes {
  status: number;
  message: string;
  details?: any;
}
