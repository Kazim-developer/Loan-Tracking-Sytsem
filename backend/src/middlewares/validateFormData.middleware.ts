import { ZodType } from "zod";

const validateFormData =
  (schema: ZodType) => (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors: { [key: string]: string } = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    req.body = result.data;
    next();
  };

export default validateFormData;
