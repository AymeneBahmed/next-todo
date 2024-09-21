"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalize, cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@prisma/client";
import { CSSProperties } from "react";

export default function TodoCard({ todo }: { todo: Todo }) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id: todo.id,
  });

  if (transform && isDragging) {
    transform.scaleX = 1.01;
    transform.scaleY = 1.01;
  }

  const style: CSSProperties = {
    position: "relative",
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Transform.toString(transform),
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: isDragging ? "none" : "auto",
    touchAction: "none",
    transition,
  };

  return (
    <Card
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      className={cn(
        "rounded-md relative overflow-hidden border-0 border-l-[6px] min-h-[125px] pt-4",
        todo.priority === "LOW" &&
          "bg-emerald-50 text-emerald-700 border-emerald-200",
        todo.priority === "MEDIUM" &&
          "bg-orange-50 text-orange-700 border-orange-200",
        todo.priority === "HIGH" && "bg-red-50 text-red-700 border-red-200"
      )}
    >
      <span
        className={cn(
          "text-lg rounded-bl w-[8rem] text-center py-1 px-4 absolute right-0 top-0",
          todo.priority === "LOW" && "bg-emerald-200 text-emerald-800",
          todo.priority === "MEDIUM" && "bg-orange-200 text-orange-800",
          todo.priority === "HIGH" && "bg-red-200 text-red-800"
        )}
      >
        {capitalize(todo.priority)}
      </span>

      <CardHeader className="space-y-7">
        <CardTitle className="text-xl break-words">{todo.title}</CardTitle>
        <CardDescription className="text-inherit">
          {todo.creationDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
