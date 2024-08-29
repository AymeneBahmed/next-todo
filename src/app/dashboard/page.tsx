import { todosTableColumns } from "@/components/todos/columns";
import NewTodoForm from "@/components/todos/NewTodoForm";
import TodosTable from "@/components/todos/TodosTable";

export default async function DashboardPage() {
  return (
    <div className="flex size-full bg-gradient-to-b from-teal-400 to-blue-500 ">
      <div className="container mx-auto py-10">
        <NewTodoForm />
        <TodosTable columns={todosTableColumns} />
      </div>
    </div>
  );
}
