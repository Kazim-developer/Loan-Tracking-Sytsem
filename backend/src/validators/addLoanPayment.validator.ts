import { z } from "zod";

export const addLoanPaymentSchema = z.object({
  id: z.string({ error: "loan id is required" }),
  payment: z
    .number({ error: "payment should only be integer" })
    .min(1, { error: "payment cannot be zero" }),
});
