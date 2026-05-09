import { z } from "zod";

export const supportSchema = z.object({
  name: z
    .string({ error: "name should be of letters only, no numbers" })
    .min(3, { error: "min length should be 3 for name" }),
  email: z.email({ error: "invalid email address" }),
  supportType: z.string(),
  message: z
    .string({ error: "type message in letters and words" })
    .min(5, { error: "min message length is 5" }),
});
