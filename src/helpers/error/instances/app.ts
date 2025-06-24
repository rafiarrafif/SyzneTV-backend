export class AppError<T = unknown> extends Error {
  public readonly statusCode: number;
  public readonly details?: T;

  constructor(statusCode = 400, message: string, details?: T) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
