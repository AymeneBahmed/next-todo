"use client";

import { Todo } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export const todosTableColumns: ColumnDef<Todo>[] = [
  {
    id: "checked",
    header: "Check",
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
  { accessorKey: "description", header: "Description" },
  { accessorKey: "priority", header: "Priority" },
  { accessorKey: "creationDate", header: "Creation Date" },
] as const;
