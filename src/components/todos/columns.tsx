"use client";

import { Todo } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

export const todosTableColumns: ColumnDef<Todo>[] = [
  {
    id: "checked",
    header({ table }) {
      return (
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
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
  { accessorKey: "creationDate", header: "Creation Date" },
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
] as const;
