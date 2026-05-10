"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { columns } from "@/components/loans/LoanTableColumns";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoansTable({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const borrowerNameFiltering = searchParams.get("search") ?? "";
  const statusFilter = searchParams.get("status") ?? "ALL";
  const repaymentTypeFilter = searchParams.get("repay_type") ?? "ALL";
  const repaymentStatusFilter = searchParams.get("repay_status") ?? "ALL";

  const columnFilters = useMemo(
    () => [
      { id: "status", value: statusFilter },
      { id: "repayment-type", value: repaymentTypeFilter },
      { id: "repayment-status", value: repaymentStatusFilter },
    ],
    [statusFilter, repaymentTypeFilter, repaymentStatusFilter],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: borrowerNameFiltering,
      columnFilters,
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="my-[2rem] rounded-lg border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-50 border-b">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="py-3 px-4 font-medium text-gray-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => router.push(`/loans/${row.original?.id}`)}
              className="cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-b-0"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-3 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
