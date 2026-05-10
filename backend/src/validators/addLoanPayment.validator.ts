import { z } from "zod";

export const addLoanPaymentSchema = z.object({
  id: z.string({ error: "Loan ID is required" }),
  payment: z
    .number({ error: "Payment amount must be a number" })
    .min(1, { error: "Payment amount must be greater than 0" }),
});
