export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(statusCode = 400, message: string, details?: any) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
