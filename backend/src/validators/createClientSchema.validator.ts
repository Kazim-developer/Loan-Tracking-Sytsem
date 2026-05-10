import { z } from "zod";

const createClientSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Client name is required" })
    .max(30, { error: "Client name cannot exceed 30 characters" }),

  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits",
    })
    .optional(),

  email: z.email({ error: "Please enter a valid email address" }),
});

export default createClientSchema;
