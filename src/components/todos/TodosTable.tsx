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
import { CSSProperties, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu, Settings, Trash2 } from "lucide-react";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import useSWR from "swr";
import { deleteTodos, updateTodos } from "@/actions/todo";
import { useNotification } from "@/hooks/useNotification";
import { Checkbox } from "../ui/checkbox";

async function fetcher(...args: Parameters<typeof fetch>) {
  return await (await fetch(...args)).json();
}

export default function TodosTable() {
  const { data: todosData, mutate } = useSWR<Todo[]>("/api/todo", fetcher);
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => (todosData ?? []).map((todo) => todo.id),
    [todosData]
  );
  const columns: ColumnDef<Todo>[] = useMemo(
    () =>
      [
        {
          id: "checked",
          header({ table }) {
            return (
              <Checkbox
                checked={
                  table.getIsAllRowsSelected() ||
                  (table.getIsSomeRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllRowsSelected(!!value)
                }
                aria-label="Check all todos"
              />
            );
          },
          cell({ row }) {
            return (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Check todo"
              />
            );
          },
          enableHiding: false,
        },
        { accessorKey: "title", header: "Title" },
        { accessorKey: "priority", header: "Priority" },
        {
          accessorKey: "creationDate",
          header: "Creation Date",
          cell({ row }) {
            const dateTime = new Date(row.original.creationDate);

            return (
              <>
                {dateTime.toLocaleTimeString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </>
            );
          },
        },
        {
          id: "drag-handle",
          header: "Move",
          cell({ row }) {
            return (function Cell() {
              const { attributes, listeners } = useSortable({
                id: row.original.id,
              });

              return (
                <Button {...attributes} {...listeners}>
                  <Menu size={20} />
                </Button>
              );
            })();
          },
        },
      ] as const,
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const todosTable = useReactTable({
    columns,
    data: todosData ?? [],
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getRowId: (row) => row.id.toString(),
    state: { columnVisibility },
  });
  const notification = useNotification();

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      const reorderedTodos = arrayMove(todosData ?? [], oldIndex, newIndex).map(
        (todo, i) => ({ ...todo, order: i + 1 })
      );

      mutate(reorderedTodos, false);

      await updateTodos(reorderedTodos);
    }
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <div className="space-y-2">
        <div className="flex gap-3">
          <form
            className="ml-auto"
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                await deleteTodos(
                  todosTable
                    .getSelectedRowModel()
                    .rows.map((row) => row.original)
                );
                await updateTodos(
                  todosTable
                    .getCoreRowModel()
                    .rows.filter((row) => !row.getIsSelected())
                    .map((row) => row.original)
                    .map((todo, i) => ({ ...todo, order: i + 1 }))
                );
                notification.show({
                  message: "Deleted todos successfully!",
                  state: "success",
                });
              } catch {
                notification.show({
                  message: "Failed to delete todos!",
                  state: "error",
                });
              }
            }}
          >
            <DeleteButton todosTable={todosTable} />
          </form>
          <VisibleColumnsButton todosTable={todosTable} />
        </div>
        <div className="rounded-md border">
          <Table className="bg-white overflow-hidden">
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
        <Button className="gap-2 bg-white" variant="outline">
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

function DeleteButton({
  todosTable,
  className,
}: {
  todosTable: TableType<Todo>;
  className?: string;
}) {
  return (
    <Button
      className={cn(className)}
      variant="destructive"
      size="icon"
      aria-label="delete todos"
      title="Delete todos"
      disabled={
        !todosTable.getIsAllRowsSelected() &&
        !todosTable.getIsSomeRowsSelected()
      }
    >
      <Trash2 />
    </Button>
  );
}
