import { ZodError } from "zod";
const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err);
  if (err instanceof ZodError) {
    const errors: { [key: string]: string } = {};

    err.issues.forEach((issue) => {
      const field = issue.path[0];
      errors[field] = issue.message;
    });

    return res.status(400).json({
      success: false,
      status: "fail",
      message: "validation failed",
      errors,
    });
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    success: false,
    status,
    message: err.message || "internal server error",
  });
};

export default errorHandler;
