class AppError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status =
      this.statusCode >= 400 && statusCode < 500
        ? "client-side error"
        : "server error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
