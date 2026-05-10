import { z } from "zod";

export const supportSchema = z.object({
  name: z
    .string({ error: "Name must contain only letters" })
    .min(3, { error: "Name must be at least 3 characters long" }),

  email: z.email({ error: "Invalid email address" }),

  supportType: z.string(),

  message: z
    .string({ error: "Message must be a valid text input" })
    .min(5, { error: "Message must be at least 5 characters long" }),
});
