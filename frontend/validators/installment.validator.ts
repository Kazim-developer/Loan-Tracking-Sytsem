type InstallmentStatus = "PENDING" | "PAID" | "OVERDUE" | "PARTIAL";

export type Installment = {
  dueDate: string;
  amount: number;
  status: InstallmentStatus;
};
