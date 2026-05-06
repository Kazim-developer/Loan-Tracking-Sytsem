import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/utils/formatCurrency";
import { Status, StatusBadge } from "./StatusBadge";

type Installment = {
  id: string;
  dueDate: string;
  amount: number;
  status: Status;
  paidAt?: string;
};

export const getColumns = (
  onMarkPaid: (installmentId: string) => void,
  activeId?: string | null,
): ColumnDef<Installment>[] => [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => new Date(row.original.dueDate).toLocaleDateString(),
  },
  {
    accessorKey: "amount",
    header: "Inst. Amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      if (value === "ALL") return true;
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    id: "paidAt",
    header: "Paid At",
    cell: ({ row }) => {
      const paidAt = row.original.paidAt;

      if (!paidAt) return "-";

      const date = new Date(paidAt);

      if (isNaN(date.getTime())) return "-";

      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const installment = row.original;

      const isLoading = activeId === installment.id;

      return (
        <button
          className="text-blue-600 font-medium disabled:opacity-50"
          disabled={installment.status === "PAID" || isLoading}
          onClick={() => onMarkPaid(installment.id)}
        >
          {isLoading ? "Updating..." : "Mark as paid"}
        </button>
      );
    },
  },
];
