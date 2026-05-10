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
        error:
          "At least 2 installments are required, or select one-time repayment",
      })
      .optional(),

    installmentSchedule: z.array(Installment),
  })
  .optional();

export const loanDataSchema = z.object({
  clientId: z
    .string()
    .min(5, { error: "No client selected. Please select a client again" }),

  totalAmount: z
    .number({ error: "Loan amount must be a number" })
    .min(1, { error: "Loan amount must be greater than 0" }),

  startingDate: z.string(),

  hasInstallments: z.boolean(),

  interestRate: z
    .number({ error: "Interest rate must be a number" })
    .optional(),

  interestType: z.enum(InterestType).optional(),

  endDate: z.string().optional(),

  totalPayable: z.number(),

  repaymentType: z.enum(RepaymentType).optional(),

  installmentData: InstallmentData,
});
