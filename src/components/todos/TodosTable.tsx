"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { Priority, Todo } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
  CSSProperties,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronDown,
  LogOut,
  Menu,
  Pencil,
  Save,
  Settings,
  Trash2,
} from "lucide-react";
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
import { ClipLoader } from "react-spinners";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function TodosTable() {
  const {
    data: todosData,
    mutate,
    isLoading,
  } = useSWR<Todo[]>("/api/todo", fetcher);
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => (todosData ?? []).map((todo) => todo.id),
    [todosData]
  );
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedTodos, setEditedTodos] = useState<
    Pick<Todo, "id" | "title" | "priority">[]
  >([]);
  const notification = useNotification();
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
        {
          accessorKey: "title",
          header: "Title",
          cell({ row }) {
            if (editMode) {
              const rowInEditedRows = editedTodos.find(
                (editedRow) => editedRow.id === row.original.id
              );

              return (
                <Input
                  defaultValue={rowInEditedRows?.title || row.original.title}
                  onBlur={(e) => {
                    const rowInEditedRows = editedTodos.find(
                      (editedRow) => editedRow.id === row.original.id
                    );

                    if (rowInEditedRows) {
                      rowInEditedRows.title = e.target.value;
                    } else {
                      editedTodos.push({
                        id: row.original.id,
                        priority: row.original.priority,
                        title: e.target.value,
                      });
                    }

                    setEditedTodos(editedTodos);
                  }}
                />
              );
            }

            return <>{row.original.title}</>;
          },
        },
        {
          accessorKey: "priority",
          header: "Priority",
          cell({ row }) {
            if (editMode) {
              const rowInEditedRows = editedTodos.find(
                (editedRow) => editedRow.id === row.original.id
              );

              return (
                <Select
                  defaultValue={
                    rowInEditedRows?.priority || row.original.priority
                  }
                  onValueChange={(e: Priority) => {
                    const rowInEditedRows = editedTodos.find(
                      (editedRow) => editedRow.id === row.original.id
                    );

                    if (rowInEditedRows) {
                      rowInEditedRows.priority = e;
                    } else {
                      editedTodos.push({
                        id: row.original.id,
                        priority: e,
                        title: row.original.title,
                      });
                    }

                    setEditedTodos(editedTodos);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={row.original.priority} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                  </SelectContent>
                </Select>
              );
            }

            return <>{row.original.priority}</>;
          },
        },
        {
          accessorKey: "creationDate",
          header() {
            return (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 p-0">
                      Creation Date <Settings size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                      checked={showDate}
                      onCheckedChange={setShowDate}
                      disabled={!showTime}
                    >
                      Show date
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={showTime}
                      onCheckedChange={setShowTime}
                      disabled={!showDate}
                    >
                      Show time
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            );
          },
          cell({ row }) {
            const dateTime = new Date(row.original.creationDate);

            return (
              <>
                {showTime &&
                  dateTime.toLocaleTimeString("en-US", {
                    ...(showDate && {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }),
                    hour: "numeric",
                    minute: "numeric",
                  })}
                {!showTime &&
                  showDate &&
                  dateTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
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
                <Button {...attributes} {...listeners} aria-label="Move todo">
                  <Menu size={20} />
                </Button>
              );
            })();
          },
        },
      ] as const,
    [editMode, editedTodos, showDate, showTime]
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [visibilePriorities, setVisiblePriorities] = useState<Priority[]>([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]);
  const todosTable = useReactTable({
    columns,
    data: todosData ?? [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getRowId: (row) => row.id.toString(),
    state: { columnVisibility, columnFilters },
  });
  const [isPending, starTransition] = useTransition();

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      const reorderedTodos = arrayMove(todosData ?? [], oldIndex, newIndex).map(
        (todo, i) => ({ ...todo, order: i + 1 })
      );

      mutate(reorderedTodos, false);

      try {
        await updateTodos(reorderedTodos);

        notification.show({
          message: "Order changed successfully!",
          state: "success",
        });
      } catch (error) {
        notification.show({
          message: "Something went wrong while re-ordering!",
          state: "error",
        });
      }
    }
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <div className="space-y-2">
        <div className="flex items-end gap-3 relative">
          <div className="ml-auto gap-3 flex">
            {editMode ? (
              <>
                <ExitEditModeButton
                  onClick={() => {
                    setEditedTodos([]);
                    setEditMode(false);
                  }}
                />
                <SaveEditModeButton
                  disabled={isPending}
                  onClick={() => {
                    if (editedTodos?.every((todo) => todo.title !== "")) {
                      starTransition(async () => {
                        try {
                          if (todosData) {
                            for (const editedTodo of editedTodos) {
                              for (const todo of todosData) {
                                if (editedTodo.id === todo.id) {
                                  todo.title = editedTodo.title;
                                  todo.priority = editedTodo.priority;

                                  break;
                                }
                              }
                            }
                          }

                          await updateTodos(todosData ?? []);

                          // update rows' colors to reflect priority
                          mutate();

                          notification.show({
                            message: "Updated the table successfully!",
                            state: "success",
                          });
                        } catch {
                          notification.show({
                            message: "Something went wrong! Please try again",
                            state: "error",
                          });
                        }

                        setEditedTodos([]);
                        setEditMode(false);
                      });
                    } else {
                      notification.show({
                        message: "'Title' column can't be empty!",
                        state: "error",
                      });
                    }
                  }}
                />
              </>
            ) : (
              <EnterEditModeButton
                onClick={() => setEditMode(true)}
                disabled={isLoading}
              />
            )}
          </div>
          <DeleteButton todosTable={todosTable} />
          <TodoTitleFilterer todosTable={todosTable} />
          <TodoPriorityFilterer
            todosTable={todosTable}
            visibilePriorities={visibilePriorities}
            setVisiblePriorities={setVisiblePriorities}
          />
          <VisibleColumnsButton todosTable={todosTable} />
        </div>
        <div className="rounded-md border">
          <Table className="bg-white overflow-hidden rounded-md">
            <TableHeader className="bg-white table w-[calc(100%-0.9em)] table-fixed">
              {todosTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.column.id === "checked" && "w-24",
                        header.column.id === "creationDate" && "w-[24rem]",
                        header.column.id === "priority" && "w-[11rem]",
                        header.column.id === "title" && "w-[23rem]",
                        header.column.id === "drag-handle" && "w-[12rem]"
                      )}
                    >
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
            <TableBody className="block relative overflow-y-scroll custom-scrollbar [&_tr]:table [&_tr]:table-fixed [&_tr]:w-full h-[calc(73px*6)]">
              {isLoading && (
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center flex-col">
                  <ClipLoader speedMultiplier={0.7} />
                  <div>Loading...</div>
                </div>
              )}
              {todosTable.getRowModel().rows.length ? (
                <SortableContext
                  key={Date.now()}
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {todosTable
                    .getRowModel()
                    .rows.filter((row) =>
                      visibilePriorities.includes(row.getValue("priority"))
                    )
                    .map((row) => (
                      <TodoDraggableRow row={row} key={row.id} />
                    ))}
                </SortableContext>
              ) : (
                <>
                  {!isLoading && (
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                      No todos.
                    </div>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DndContext>
  );
}

function TodoTitleFilterer({
  todosTable,
  className,
}: {
  todosTable: TableType<Todo>;
  className?: string;
}) {
  return (
    <>
      <Input
        value={
          (todosTable.getColumn("title")?.getFilterValue() as string) ?? ""
        }
        onChange={(e) =>
          todosTable.getColumn("title")?.setFilterValue(e.target.value)
        }
        placeholder="Filter todo's title..."
        className={cn("w-[20%]", className)}
      />
    </>
  );
}

function TodoPriorityFilterer({
  todosTable,
  visibilePriorities,
  setVisiblePriorities,
}: {
  todosTable: TableType<Todo>;
  visibilePriorities: Priority[];
  setVisiblePriorities: Dispatch<SetStateAction<Priority[]>>;
}) {
  const priorities = ["LOW", "MEDIUM", "HIGH"] as const;

  return (
    <div className="flex flex-col relative">
      <div className="flex *:w-1/3 *:text-center">
        {visibilePriorities.includes("LOW") && (
          <div
            className={cn(
              "text-black rounded-tl bg-emerald-500",
              visibilePriorities.length === 1 && "rounded-tr"
            )}
            title="low"
          >
            L
          </div>
        )}
        {visibilePriorities.includes("MEDIUM") && (
          <div
            className={cn(
              "text-black bg-orange-500",
              !visibilePriorities.includes("LOW") && "rounded-tl",
              !visibilePriorities.includes("HIGH") && "rounded-tr"
            )}
            title="medium"
          >
            M
          </div>
        )}
        {visibilePriorities.includes("HIGH") && (
          <div
            className={cn(
              "text-black rounded-tr bg-red-500",
              visibilePriorities.length === 1 && "rounded-tl"
            )}
            title="high"
          >
            H
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "gap-1",
              visibilePriorities.length !== 0 && "rounded-t-none",
              [1, 2].includes(visibilePriorities.length) && "rounded-r-md"
            )}
          >
            priority <ChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {priorities.map((priority) => (
            <DropdownMenuCheckboxItem
              key={priority}
              checked={visibilePriorities.includes(priority)}
              onCheckedChange={(checked) =>
                checked
                  ? setVisiblePriorities([...visibilePriorities, priority])
                  : setVisiblePriorities(
                      visibilePriorities.filter(
                        (visibilePriority) => visibilePriority !== priority
                      )
                    )
              }
            >
              {priority}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
        "h-[73px]",
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
        <TableCell
          key={cell.id}
          className={cn(
            cell.column.id === "checked" && "w-24",
            cell.column.id === "creationDate" && "w-[24rem]",
            cell.column.id === "priority" && "w-[11rem]",
            cell.column.id === "title" && "w-[23rem]",
            cell.column.id === "drag-handle" && "w-[12rem]"
          )}
        >
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
  const notification = useNotification();
  const [isPending, starTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        starTransition(async () => {
          try {
            await deleteTodos(
              todosTable.getSelectedRowModel().rows.map((row) => row.original)
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
        });
      }}
    >
      <Button
        className={cn(className)}
        variant="destructive"
        size="icon"
        aria-label="delete todos"
        title="Delete todos"
        disabled={
          (!todosTable.getIsAllRowsSelected() &&
            !todosTable.getIsSomeRowsSelected()) ||
          isPending
        }
      >
        <Trash2 />
      </Button>
    </form>
  );
}

function EnterEditModeButton({
  onClick,
  className,
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(className)}
      size="icon"
      title="edit mode"
      aria-label="Enter edit mode"
      disabled={disabled}
    >
      <Pencil />
    </Button>
  );
}

function SaveEditModeButton({
  onClick,
  className,
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(className)}
      size="icon"
      title="save"
      aria-label="Save"
      disabled={disabled}
    >
      <Save />
    </Button>
  );
}

function ExitEditModeButton({
  onClick,
  className,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(className)}
      size="icon"
      title="exit edit mode"
      aria-label="Exit edit mode"
    >
      <LogOut />
    </Button>
  );
}
