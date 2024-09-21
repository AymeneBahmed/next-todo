"use client";

import { Todo } from "@prisma/client";
import TodoCard from "./TodoCard";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useMemo, useState } from "react";
import { mutate } from "swr";
import { updateTodos } from "@/actions/todo";
import { useNotification } from "@/hooks/useNotification";

export default function TodosStack({ todos }: { todos: Todo[] }) {
  const [localTodos, setLocalTodos] = useState(todos);
  const todosIds = useMemo<UniqueIdentifier[]>(
    () => localTodos.map(({ id }) => id),
    [localTodos]
  );
  const notification = useNotification();

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const oldIndex = todosIds.indexOf(active.id);
      const newIndex = todosIds.indexOf(over.id);

      const reorderedTodos = arrayMove(localTodos, oldIndex, newIndex).map(
        (todo, i) => ({ ...todo, order: i + 1 })
      );

      try {
        setLocalTodos(reorderedTodos);
        await updateTodos(reorderedTodos);

        mutate("/api/todo", reorderedTodos);

        notification.show({
          message: "Order changed successfully!",
          state: "success",
        });
      } catch (error) {
        setLocalTodos(todos);

        notification.show({
          message: "Something went wrong while re-ordering!",
          state: "error",
        });
      }
    }
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <div className="w-[90%] space-y-3 h-[calc((120px+12px)*5)] overflow-y-scroll custom-scrollbar">
        <SortableContext
          items={localTodos}
          strategy={verticalListSortingStrategy}
        >
          {localTodos.map((todo) => (
            <TodoCard todo={todo} key={todo.id} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
