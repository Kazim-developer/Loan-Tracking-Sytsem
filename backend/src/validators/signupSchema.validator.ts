import { z } from "zod";

export const signupSchema = z.object({
  email: z.email({ error: "Invalid email address" }),

  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .max(20, { error: "Password cannot exceed 20 characters" }),
});
