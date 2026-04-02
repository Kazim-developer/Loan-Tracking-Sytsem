import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(8, { error: "password is too weak, minimum 8 character" })
    .max(20, { error: "max password length should be 20" }),
});
