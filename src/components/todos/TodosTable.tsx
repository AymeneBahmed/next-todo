"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
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
import { CSSProperties, useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface TodosTableProps {
  columns: ColumnDef<Todo>[];
  data: Todo[];
}

export default function TodosTable({ columns, data }: TodosTableProps) {
  const [todosData, setTodosData] = useState(data);
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => todosData.map((todo) => todo.id),
    [todosData]
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const todosTable = useReactTable({
    columns,
    data: todosData,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getRowId: (row) => row.id.toString(),
    state: { columnVisibility },
  });

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      setTodosData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <div className="space-y-2">
        <div className="flex">
          <VisibleColumnsButton todosTable={todosTable} />
        </div>
        <div className="rounded-md border">
          <Table className="bg-white">
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
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {todosTable.getRowModel().rows.map((row) => (
                    <TodoDraggableRow row={row} key={row.id} />
                  ))}
                </SortableContext>
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
    </DndContext>
  );
}

function TodoDraggableRow({ row }: { row: Row<Todo> }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.original.id,
  });

  if (transform && isDragging) {
    transform.scaleX = 1.01;
    transform.scaleY = 1.01;
  }

  const style: CSSProperties = {
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      key={row.id}
      id={row.id}
      className={cn(
        "h-14",
        row.getValue("priority") === "HIGH" && "bg-red-50 text-red-700",
        row.getValue("priority") === "MEDIUM" && "bg-orange-50 text-orange-700",
        row.getValue("priority") === "LOW" && "bg-emerald-50 text-emerald-700",
        "data-[state=selected]:bg-blue-100 data-[state=selected]:text-blue-700"
      )}
      data-state={row.getIsSelected() && "selected"}
      ref={setNodeRef}
      style={style}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
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
