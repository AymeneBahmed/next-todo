import { todosTableColumns } from "@/components/todos/columns";
import TodosTable from "@/components/todos/TodosTable";
import { Todo } from "@prisma/client";

async function getTodos(): Promise<Todo[]> {
  return [
    {
      id: 1,
      title: "Say hello",
      description: "Do something funny",
      priority: "MEDIUM",
      creationDate: new Date(),
      userId: "",
    },
    {
      id: 2,
      title: "Coock Pasta",
      description: "Coock Pasta for moutanamira",
      priority: "HIGH",
      creationDate: new Date(),
      userId: "",
    },
    {
      id: 3,
      title: "Take shower",
      description: "Clean your body",
      priority: "HIGH",
      creationDate: new Date(),
      userId: "",
    },
    {
      id: 4,
      title: "Do dishes",
      description: "Wash the boring dishes",
      priority: "LOW",
      creationDate: new Date(),
      userId: "",
    },
    {
      id: 5,
      title: "Become social",
      description: "Touch some grass",
      priority: "LOW",
      creationDate: new Date(),
      userId: "",
    },
    {
      id: 6,
      title: "Play with dog",
      description: "Have a walk with Mike 🐕‍🦺",
      priority: "MEDIUM",
      creationDate: new Date(),
      userId: "",
    },
  ];
}

export default async function DashboardPage() {
  const todos = await getTodos();

  return (
    <div className="flex size-full bg-gradient-to-b from-teal-400 to-blue-500 ">
      <div className="container mx-auto py-10">
        <TodosTable columns={todosTableColumns} data={todos} />
      </div>
    </div>
  );
}
