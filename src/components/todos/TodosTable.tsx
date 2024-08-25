"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Table as TableType,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Todo } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface TodosTableProps {
  columns: ColumnDef<Todo>[];
  data: Todo[];
}

export default function TodosTable({ columns, data }: TodosTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const todosTable = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { columnVisibility },
  });

  return (
    <div className="space-y-2">
      <div className="flex">
        <VisibleColumnsButton todosTable={todosTable} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-white">
            {todosTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {todosTable.getRowModel().rows.length ? (
              todosTable.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "h-14",
                    row.getValue("priority") === "HIGH" &&
                      "bg-red-50 text-red-700",
                    row.getValue("priority") === "MEDIUM" &&
                      "bg-orange-50 text-orange-700",
                    row.getValue("priority") === "LOW" &&
                      "bg-emerald-50 text-emerald-700",
                    "data-[state=selected]:bg-blue-100 data-[state=selected]:text-blue-700"
                  )}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function VisibleColumnsButton({ todosTable }: { todosTable: TableType<Todo> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto gap-2 bg-white" variant="outline">
          <Menu size={20} />
          columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {todosTable
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={column.toggleVisibility}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
