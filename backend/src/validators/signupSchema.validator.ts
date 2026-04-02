import { z } from "zod";

export const signupSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "password is too weak, minimum 8 character" })
    .max(20, { error: "max password length should be 20" }),
});
