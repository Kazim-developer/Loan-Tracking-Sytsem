import { z } from "zod";

const createClientSchema = z.object({
  name: z
    .string()
    .min(1, { error: "name required" })
    .max(30, { error: "name is too long, max. 20 characters " }),
  phone: z
    .string()
    .length(11, { message: "Phone must be exactly 11 digits" })
    .regex(/^\d+$/, { message: "Phone must contain only digits" })
    .optional(),
  email: z.email({ error: "invalid email" }),
});

export default createClientSchema;
