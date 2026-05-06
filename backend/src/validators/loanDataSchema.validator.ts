import { z } from "zod";

const InterestType = ["SIMPLE", "COMPOUND"] as const;
const InstallmentFrequency = ["WEEKLY", "MONTHLY"] as const;
const RepaymentType = ["one-time", "installments"] as const;
const InstallmentStatus = ["PENDING", "PAID", "OVERDUE", "PARTIAL"] as const;

const Installment = z.object({
  dueDate: z.string(),
  amount: z.number(),
  status: z.enum(InstallmentStatus),
});

const InstallmentData = z
  .object({
    installmentFrequency: z.enum(InstallmentFrequency).optional(),
    installmentAmount: z.number().optional(),
    firstInstallmentDate: z.string().optional(),
    lastInstallmentDate: z.string().optional(),
    totalInstallments: z
      .number()
      .min(2, {
        error: "min 2 installments required, or choose one-time repayment",
      })
      .optional(),

    installmentSchedule: z.array(Installment),
  })
  .optional();

export const loanDataSchema = z.object({
  clientId: z.string().min(5, { error: "no client found, select again" }),
  totalAmount: z
    .number({ error: "invalid loan amount, only integer allowed" })
    .min(1, { error: "loan amount cannot be zero" }),
  startingDate: z.string(),
  hasInstallments: z.boolean(),

  interestRate: z
    .number({ error: "invalid interest rate, only integer allowed" })
    .optional(),
  interestType: z.enum(InterestType).optional(),

  endDate: z.string().optional(),

  totalPayable: z.number(),

  repaymentType: z.enum(RepaymentType).optional(),

  installmentData: InstallmentData,
});
