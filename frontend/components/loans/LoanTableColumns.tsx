import { RepaymentBadge } from "@/components/loans/RepaymentBadge";
import { StatusBadge } from "@/components/loans/StatusBadge";
import { formatCurrency } from "@/utils/formatCurrency";
import { ColumnDef } from "@tanstack/react-table";
import { toTitleCase } from "@/utils/toTitleCase";

export const columns: ColumnDef<any>[] = [
  {
    header: "Borrower",
    accessorFn: (row) => toTitleCase(row.client.name),
  },

  {
    header: "Loan Amount",
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const amount = row.original.totalAmount;

      return formatCurrency(amount);
    },
  },

  {
    id: "status",
    accessorFn: (row) => row.status,

    header: "Status",

    cell: ({ row }) => <StatusBadge status={row.original.status} />,

    filterFn: (row, columnId, value) => {
      if (value === "ALL") return true;
      return row.getValue(columnId) === value;
    },
  },

  {
    id: "repayment-status",
    accessorFn: (row) => row.repaymentStatus,

    header: "Repay. Status",

    cell: ({ row }) => <StatusBadge status={row.original.repaymentStatus} />,

    filterFn: (row, columnId, value) => {
      if (value === "ALL") return true;
      return row.getValue(columnId) === value;
    },
  },

  {
    header: "Next Inst. Date",
    accessorFn: (row) => {
      if (!row.hasInstallments) return "-";

      const next = row.installments
        ?.filter((inst) => inst.status === "PENDING")
        ?.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        )[0];

      if (!next?.dueDate) return "-";

      return new Date(next.dueDate).toLocaleDateString();
    },
  },

  {
    id: "repayment-type",
    accessorFn: (row) => (row.hasInstallments ? "INSTALLMENTS" : "ONE-TIME"),

    header: "Repay. Type",

    cell: ({ row }) => (
      <RepaymentBadge
        type={row.original.hasInstallments ? "INSTALLMENTS" : "ONE-TIME"}
      />
    ),

    filterFn: (row, columnId, value) => {
      if (value === "ALL") return true;
      return row.getValue(columnId) === value;
    },
  },

  {
    header: "Start Date",
    accessorFn: (row) => new Date(row.startingDate).toLocaleDateString(),
  },

  {
    header: "End Date",
    accessorFn: (row) =>
      !row.hasInstallments ? new Date(row.endDate).toLocaleDateString() : "-",
  },
];
