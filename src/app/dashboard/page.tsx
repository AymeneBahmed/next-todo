import Settings from "@/components/Settings";
import NewTodoForm from "@/components/todos/NewTodoForm";
import TodosTable from "@/components/todos/TodosTable";
import Image from "next/image";
import backgroundImg from "@/assets/background.jpg";

export default async function DashboardPage() {
  return (
    <div className="size-full bg-gradient-to-b from-teal-400 to-blue-500">
      <Image src={backgroundImg} alt="" fill quality={100} />
      <Settings />

      <div className="container mx-auto py-10">
        <NewTodoForm />
        <TodosTable />
      </div>
    </div>
  );
}
