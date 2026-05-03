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

import { getColumns } from "./InstallmentTableColumns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { updateInstallmentStatus } from "@/handlers/updateInstallmentStatus";

export default function InstallmentTable({ data }) {
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") ?? "ALL";

  const columnFilters = useMemo(
    () => [{ id: "status", value: statusFilter }],
    [statusFilter],
  );

  const handleMarkPaid = async (installmentId: string) => {
    await updateInstallmentStatus(installmentId);
  };

  const columns = getColumns(handleMarkPaid);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
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
              className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
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
