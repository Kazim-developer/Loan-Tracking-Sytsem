import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string(),

  newPassword: z
    .string()
    .min(8, {
      error: "Password must be at least 8 characters",
    })
    .max(20, {
      error: "Password cannot exceed 20 characters",
    }),
});
