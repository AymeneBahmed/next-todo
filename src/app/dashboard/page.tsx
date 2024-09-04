import NewTodoForm from "@/components/todos/NewTodoForm";
import TodosTable from "@/components/todos/TodosTable";
import Image from "next/image";
import backgroundImg from "@/assets/background.jpg";
import AvatarDropdownMenu from "@/components/AvatarDropdownMenu";
import Avatar from "@/components/Avatar";

export default async function DashboardPage() {
  return (
    <div className="size-full bg-gradient-to-b from-teal-400 to-blue-500">
      <Image src={backgroundImg} alt="" fill quality={100} />

      <div className="absolute right-10 top-10">
        <AvatarDropdownMenu className="relative">
          <Avatar className="size-[4rem] z-10" />
          <div className="size-full absolute scale-[1.12] top-0 z-0 rounded-full bg-gradient-to-br from-emerald-300 to-primary"></div>
        </AvatarDropdownMenu>
      </div>

      <div className="container mx-auto py-10">
        <NewTodoForm />
        <TodosTable />
      </div>
    </div>
  );
}
