import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/utils/formatCurrency";

export const columns: ColumnDef<any>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },

  {
    header: "Paid Amount",
    accessorKey: "paidAmount",
    cell: ({ row }) => {
      const amount = row.original.amount;

      return formatCurrency(amount);
    },
  },

  {
    header: "Paid At",
    accessorFn: (row) => new Date(row.paidAt).toLocaleDateString(),
  },
];
