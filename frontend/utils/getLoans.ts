export type Status = "ACTIVE" | "CLOSED";
export type RepaymentType = "ONE-TIME" | "INSTALLMENTS";
export type RepaymentStatus =
  | "PENDING"
  | "PARTIAL"
  | "OVERDUE"
  | "PAID"
  | "DUE";

export const getLoans = async (
  page: number,
  limit: number,
  search?: string,
  status?: Status,
  repaymentType?: RepaymentType,
  repaymentStatus?: RepaymentStatus,
) => {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (repaymentType) params.set("repay_type", repaymentType);
  if (repaymentStatus) params.set("repay_status", repaymentStatus);

  const res = await fetch(`http://localhost:5000/loans?${params.toString()}`, {
    credentials: "include",
  });

  return res.json();
};
